import { NextRequest, NextResponse } from "next/server";
import { readFile, mkdir } from "fs/promises";
import { join } from "path";
import { Order } from "@/lib/types";

const ORDERS_DIR = join(process.cwd(), "data", "orders");

// Ensure orders directory exists
async function ensureOrdersDir() {
  try {
    await mkdir(ORDERS_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating orders directory:", error);
  }
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await loadOrder(id);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
