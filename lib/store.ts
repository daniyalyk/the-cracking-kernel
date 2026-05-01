/**
 * Zustand cart store for managing shopping cart state
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, MenuItem } from "./types";

interface CartStore {
  // State
  items: CartItem[];

  // Actions
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Getters
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getCartItems: () => CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],

      // Add item to cart
      addToCart: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + 1,
                      subtotal: (i.quantity + 1) * i.price,
                    }
                  : i
              ),
            };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
                subtotal: item.price,
              },
            ],
          };
        });
      },

      // Remove item from cart
      removeFromCart: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      // Update item quantity
      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.id !== itemId),
            };
          }

          return {
            items: state.items.map((i) =>
              i.id === itemId
                ? {
                    ...i,
                    quantity,
                    subtotal: quantity * i.price,
                  }
                : i
            ),
          };
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get total price
      getTotalPrice: () => {
        return get()
          .items.reduce((total, item) => total + item.subtotal, 0);
      },

      // Get total number of items
      getTotalItems: () => {
        return get()
          .items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get all cart items
      getCartItems: () => {
        return get().items;
      },
    }),
    {
      name: "cart-store",
      version: 1,
    }
  )
);
