/**
 * Core TypeScript interfaces for the ordering system
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  desc: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  subtotal: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerInfo: CustomerInfo;
  paymentStatus: "pending" | "completed" | "failed";
  orderDate: Date;
  deliveryAddress: string;
  deliveryNotes?: string;
  estimatedDeliveryTime?: string;
}

export interface AlfaGatewayPayload {
  orderId: string;
  amount: number;
  currency: "PKR";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  notifyUrl: string;
}

export interface AlfaGatewayResponse {
  SessionToken: string;
  TransactionReference: string;
  ResponseCode: string;
  ResponseMessage: string;
}

export interface AlfaGatewayCallbackPayload {
  SessionToken: string;
  TransactionReference: string;
  ResponseCode: string;
  ResponseMessage: string;
  Amount: number;
  OrderReference: string;
}
