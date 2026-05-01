/**
 * Alfa Gateway Helper Functions
 * Utilities for payment gateway integration
 */

export interface PaymentInitiationData {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

/**
 * Initiate Alfa Gateway payment
 * Returns payment URL for redirect
 */
export async function initiateAlfaGatewayPayment(
  data: PaymentInitiationData
): Promise<string> {
  try {
    const response = await fetch("/api/payment/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: data.orderId,
        amount: data.amount,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to initiate payment");
    }

    const paymentData = await response.json();

    if (!paymentData.paymentUrl) {
      throw new Error("Payment URL not received from gateway");
    }

    return paymentData.paymentUrl;
  } catch (error) {
    console.error("Error initiating Alfa Gateway payment:", error);
    throw error;
  }
}

/**
 * Verify payment status
 */
export async function verifyPaymentStatus(orderId: string): Promise<"completed" | "failed" | "pending"> {
  try {
    const response = await fetch(`/api/payment/callback?orderId=${orderId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to verify payment status");
    }

    const data = await response.json();
    return data.paymentStatus;
  } catch (error) {
    console.error("Error verifying payment status:", error);
    return "pending";
  }
}

/**
 * Redirect to Alfa Gateway checkout
 */
export function redirectToAlfaGateway(paymentUrl: string): void {
  if (typeof window !== "undefined") {
    window.location.href = paymentUrl;
  }
}
