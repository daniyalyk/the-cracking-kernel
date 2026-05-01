import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { Order, CartItem, CustomerInfo } from "@/lib/types";

const ORDERS_DIR = join(process.cwd(), "data", "orders");

// Ensure orders directory exists
async function ensureOrdersDir() {
  try {
    await mkdir(ORDERS_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating orders directory:", error);
  }
}

// Generate unique order ID
function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Save order to file
async function saveOrder(order: Order): Promise<void> {
  await ensureOrdersDir();
  const fileName = join(ORDERS_DIR, `${order.id}.json`);
  await writeFile(fileName, JSON.stringify(order, null, 2));
}

// Load order from file
async function loadOrder(orderId: string): Promise<Order | null> {
  await ensureOrdersDir();
  try {
    const fileName = join(ORDERS_DIR, `${orderId}.json`);
    const data = await readFile(fileName, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading order:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      items,
      customerInfo,
      deliveryAddress,
      deliveryNotes,
      totalAmount,
    } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required" },
        { status: 400 }
      );
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json(
        { error: "Customer information is incomplete" },
        { status: 400 }
      );
    }

    if (!deliveryAddress) {
      return NextResponse.json(
        { error: "Delivery address is required" },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Create order
    const orderId = generateOrderId();
    const order: Order = {
      id: orderId,
      items: items as CartItem[],
      totalAmount,
      customerInfo: customerInfo as CustomerInfo,
      paymentStatus: "pending",
      orderDate: new Date(),
      deliveryAddress,
      deliveryNotes: deliveryNotes || undefined,
      estimatedDeliveryTime: "30-45 mins",
    };

    // Save order
    await saveOrder(order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // List all orders (optional - can be removed for security)
    await ensureOrdersDir();
    return NextResponse.json(
      { error: "Use specific order ID to fetch order details" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error reading orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
