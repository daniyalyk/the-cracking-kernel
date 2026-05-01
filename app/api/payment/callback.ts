import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { Order } from "@/lib/types";

const ORDERS_DIR = join(process.cwd(), "data", "orders");

/**
 * Payment Callback Handler - Receives payment confirmation from Alfa Gateway
 * Updates order payment status based on callback response
 */

interface AlfaGatewayCallback {
  SessionToken: string;
  TransactionReference: string;
  ResponseCode: string;
  ResponseMessage: string;
  Amount: number;
  OrderReference: string;
  MerchantHash?: string;
}

// Load order from file
async function loadOrder(orderId: string): Promise<Order | null> {
  try {
    const fileName = join(ORDERS_DIR, `${orderId}.json`);
    const data = await readFile(fileName, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading order:", error);
    return null;
  }
}

// Save order to file
async function saveOrder(order: Order): Promise<void> {
  try {
    await mkdir(ORDERS_DIR, { recursive: true });
    const fileName = join(ORDERS_DIR, `${order.id}.json`);
    await writeFile(fileName, JSON.stringify(order, null, 2));
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const callback: AlfaGatewayCallback = body;

    console.log("Payment callback received:", {
      orderId: callback.OrderReference,
      responseCode: callback.ResponseCode,
      transactionRef: callback.TransactionReference,
    });

    // Validate callback
    if (!callback.OrderReference) {
      console.error("Missing OrderReference in callback");
      return NextResponse.json(
        { error: "Invalid callback: missing OrderReference" },
        { status: 400 }
      );
    }

    // Load order
    const order = await loadOrder(callback.OrderReference);

    if (!order) {
      console.error(`Order not found: ${callback.OrderReference}`);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Verify the amount matches
    if (callback.Amount !== Math.round(order.totalAmount * 100)) {
      console.error("Amount mismatch in payment callback");
      return NextResponse.json(
        { error: "Amount mismatch" },
        { status: 400 }
      );
    }

    // Update order based on response code
    // Response Code "00000" = Success
    // All other codes = Failure
    const isSuccess = callback.ResponseCode === "00000";

    order.paymentStatus = isSuccess ? "completed" : "failed";

    // Add payment details to order (optional - for audit trail)
    if (!("paymentDetails" in order)) {
      (order as any).paymentDetails = {
        transactionReference: callback.TransactionReference,
        responseCode: callback.ResponseCode,
        responseMessage: callback.ResponseMessage,
        callbackTimestamp: new Date().toISOString(),
      };
    }

    // Save updated order
    await saveOrder(order);

    // Log payment transaction
    console.log(
      `Payment ${isSuccess ? "completed" : "failed"} for order ${order.id}`
    );

    // Return success response to Alfa Gateway
    return NextResponse.json({
      success: isSuccess,
      orderId: order.id,
      paymentStatus: order.paymentStatus,
      message: isSuccess
        ? "Payment processed successfully"
        : "Payment failed",
    });
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      {
        error: "Failed to process payment callback",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for Alfa Gateway verification (if needed)
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await loadOrder(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      paymentStatus: order.paymentStatus,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
