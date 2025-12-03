import { useCartStore } from "../store/useCartStore";

export const getGuestId = () => {
  if (typeof window === "undefined") {
    return "guest_ssr";
  }

  const existing = localStorage.getItem("guest_id");
  if (existing) return existing;

  const newId = `guest_${crypto.randomUUID()}`;
  localStorage.setItem("guest_id", newId);
  return newId;
};

export const useCart = (userName) => {
  const finalUserName = getGuestId();

  const {
    userCarts,
    addProduct,
    removeProduct,
    getCartByUser,
    clearCart,
    clearAllCarts,
    decreaseProductCount,
    increaseProductCount,
    removeCartByUser,
  } = useCartStore();

  const productList = getCartByUser(finalUserName);

  const toggleProduct = (productId) => {
    const exists = productList.some((item) => item.productId === productId);
    if (exists) {
      removeProduct(finalUserName, productId);
    } else {
      addProduct(finalUserName, productId);
    }
  };

  const isProductInCart = (productId) => {
    return productList.some((item) => item.productId === productId);
  };

  const clearTenantCart = () => {
    clearCart(finalUserName);
  };

  const totalItems = productList.reduce((acc, item) => acc + item.count, 0);

  return {
    productIds: productList.map((item) => item.productId),
    addProduct: (productId) => addProduct(finalUserName, productId),
    decreaseProductCount: (productId) =>
    decreaseProductCount(finalUserName, productId),
    increaseProductCount: (productId) =>
    increaseProductCount(finalUserName, productId),
    removeProduct: (productId) => removeProduct(finalUserName, productId),
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems,
    userCarts,
    getCartByUser: () => getCartByUser(finalUserName),
    removeCartByUser,
  };
};
