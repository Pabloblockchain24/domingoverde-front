import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item._id === product._id);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, cantidad: 1 }],
            };
          }
        }),

      removeFromCart: (_id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== _id),
        })),

      updateQuantity: (_id, cantidad) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === _id ? { ...item, cantidad } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
