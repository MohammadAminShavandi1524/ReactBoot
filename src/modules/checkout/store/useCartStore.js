import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    (set, get) => ({
      userCarts: {},

      addProduct: (userName, productId) =>
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };
          const exists = userCart.productIds.find(
            (p) => p.productId === productId
          );
          if (exists) return {};

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: {
                productIds: [...userCart.productIds, { productId, count: 1 }],
              },
            },
          };
        }),

      increaseProductCount: (userName, productId) =>
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };
          const exists = userCart.productIds.find(
            (p) => p.productId === productId
          );

          let updated;
          if (exists) {
            updated = userCart.productIds.map((p) =>
              p.productId === productId ? { ...p, count: p.count + 1 } : p
            );
          } else {
            updated = [...userCart.productIds, { productId, count: 1 }];
          }

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: { productIds: updated },
            },
          };
        }),

      decreaseProductCount: (userName, productId) =>
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };

          const updated = userCart.productIds
            .map((p) =>
              p.productId === productId ? { ...p, count: p.count - 1 } : p
            )
            .filter((p) => p.count > 0); // حذف اگه صفر شد

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: { productIds: updated },
            },
          };
        }),

      removeProduct: (userName, productId) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userName]: {
              productIds:
                state.userCarts[userName]?.productIds.filter(
                  (p) => p.productId !== productId
                ) || [],
            },
          },
        })),

      clearCart: (userName) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userName]: { productIds: [] },
          },
        })),

      clearAllCarts: () => set({ userCarts: {} }),

      getCartByUser: (userName) => get().userCarts[userName]?.productIds || [],

      removeCartByUser: (userName) =>
        set((state) => {
          const newUserCarts = { ...state.userCarts };
          delete newUserCarts[userName];
          return { userCarts: newUserCarts };
        }),

      addProductWithCount: (userName, productId, count) => {
        set((state) => {
          const userCart = state.userCarts[userName] || { productIds: [] };

          const updatedProducts = userCart.productIds.some(
            (item) => item.productId === productId
          )
            ? userCart.productIds.map((item) =>
                item.productId === productId ? { ...item, count } : item
              )
            : [...userCart.productIds, { productId, count }];

          return {
            userCarts: {
              ...state.userCarts,
              [userName]: {
                productIds: updatedProducts,
              },
            },
          };
        });
      },
    }),
    {
      name: "DigiXCart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
