import { NextRequest, NextResponse } from "next/server";

/**
 * Payment Initiation API - Alfa Gateway Integration
 * Step 1: Generate session token from Alfa Gateway
 * Step 2: Create transaction session
 * Step 3: Return payment URL for redirect
 */

interface AlfaGatewayTokenRequest {
  MerchantId: string;
  Password: string;
  Token: string;
}

interface AlfaGatewayTokenResponse {
  SessionToken: string;
  ResponseCode: string;
  ResponseMessage: string;
}

interface AlfaGatewaySessionRequest {
  SessionToken: string;
  Amount: number;
  OrderReference: string;
  ReturnURL: string;
  NotifyURL: string;
  ExpiryTime: number;
  CurrencyCode: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount } = body;

    // Validate input
    if (!orderId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Order ID and valid amount are required" },
        { status: 400 }
      );
    }

    // Get Alfa Gateway credentials from environment variables
    const merchantId = process.env.ALFA_MERCHANT_ID;
    const password = process.env.ALFA_PASSWORD;
    const token = process.env.ALFA_TOKEN;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!merchantId || !password || !token) {
      console.error("Missing Alfa Gateway credentials in environment variables");
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 }
      );
    }

    // Step 1: Get session token from Alfa Gateway
    const tokenPayload: AlfaGatewayTokenRequest = {
      MerchantId: merchantId,
      Password: password,
      Token: token,
    };

    console.log("Requesting session token from Alfa Gateway...");

    const tokenResponse = await fetch(
      "https://gateway.alfaaml.com.pk/gateway/session/json/session/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tokenPayload),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(`Alfa Gateway token request failed: ${tokenResponse.statusText}`);
    }

    const tokenData: AlfaGatewayTokenResponse = await tokenResponse.json();

    if (tokenData.ResponseCode !== "00000") {
      console.error("Alfa Gateway token error:", tokenData);
      return NextResponse.json(
        { error: `Payment gateway error: ${tokenData.ResponseMessage}` },
        { status: 400 }
      );
    }

    const sessionToken = tokenData.SessionToken;

    // Step 2: Create transaction session
    const sessionPayload: AlfaGatewaySessionRequest = {
      SessionToken: sessionToken,
      Amount: Math.round(amount * 100), // Convert to smallest currency unit (paisas)
      OrderReference: orderId,
      ReturnURL: `${appUrl}/checkout/confirmation?orderId=${orderId}`,
      NotifyURL: `${appUrl}/api/payment/callback`,
      ExpiryTime: 600, // 10 minutes
      CurrencyCode: "PKR",
    };

    console.log("Creating payment session with Alfa Gateway...");

    const sessionResponse = await fetch(
      "https://gateway.alfaaml.com.pk/gateway/session/json/session/initiate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionPayload),
      }
    );

    if (!sessionResponse.ok) {
      throw new Error(
        `Alfa Gateway session request failed: ${sessionResponse.statusText}`
      );
    }

    const sessionData = await sessionResponse.json();

    if (sessionData.ResponseCode !== "00000") {
      console.error("Alfa Gateway session error:", sessionData);
      return NextResponse.json(
        { error: `Payment session error: ${sessionData.ResponseMessage}` },
        { status: 400 }
      );
    }

    // Return session token and payment URL
    return NextResponse.json({
      success: true,
      sessionToken: sessionToken,
      transactionReference: sessionData.TransactionReference,
      paymentUrl: `https://gateway.alfaaml.com.pk/checkout?SessionToken=${sessionToken}`,
      orderId: orderId,
      amount: amount,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      {
        error: "Failed to initiate payment",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
