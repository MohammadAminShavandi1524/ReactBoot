import { useState } from "react";
import { useCart } from "../../modules/checkout/hooks/useCart";
import TomanLogo from "../tomanLogo/TomanLogo";
import { allProducts } from "../../data/data";
import "./CartPage.css";
import {
  BadgeCheck,
  BadgePercent,
  ChevronLeft,
  Copy,
  Minus,
  Percent,
  Plus,
  Store,
  Trash,
  Trash2,
  Truck,
} from "lucide-react";

import {
  convertToPersianNumber,
  getDiscountPercent,
  getFarsiColor,
  getHexColor,
} from "../../utils/utils";

const CartPage = () => {
  const [isRemoveProductHovered, setIsRemoveProductHovered] = useState("");

  const {
    clearCart,
    removeProduct,
    decreaseProductCount,
    increaseProductCount,
    getCartByUser,
  } = useCart();

  const userProductIds = getCartByUser();

  const productIds = [];
  userProductIds.flatMap((o) => productIds.push(o.productId));

  const userCartProducts = allProducts.filter((product) => {
    return productIds.includes(product.order);
  });

  const userCartProductsLength = userCartProducts.length;

  const productCount = (product) => {
    return userProductIds?.find((id) => id.productId === product.order).count;
  };

  const userAvailableCartProducts = userCartProducts?.filter(
    (product) => product.qty > 0
  );

  const productPrices = userAvailableCartProducts?.reduce((acc, curr) => {
    const count =
      userProductIds?.find((p) => p.productId === curr.order)?.count ?? 0;
    return acc + curr.price * count;
  }, 0);

  const productOffPrices = userAvailableCartProducts?.reduce((acc, curr) => {
    const count =
      userProductIds?.find((p) => p.productId === curr.order)?.count ?? 0;

    if (curr.offPrice > 0) {
      return acc + (curr.offPrice ?? 0) * count;
    } else {
      return acc + curr.price * count;
    }
  }, 0);

  const ProfitFromPurchase = productPrices - productOffPrices;
  const ProfitFromPurchaseDiscount = Math.ceil(
    ((productPrices - productOffPrices) / productPrices) * 100
  );

  // *** تعداد ایتم های سبد خرید

  const availableProductIds = new Set(
    userCartProducts
      ?.filter((product) => product.qty > 0)
      .map((product) => product.order)
  );

  const cartItemCount =
    userProductIds?.reduce((acc, curr) => {
      if (availableProductIds.has(curr.productId)) {
        return acc + curr.count;
      }
      return acc;
    }, 0) ?? 0;

  // **************************************************************
  if (userCartProductsLength === 0)
    return (
      <div className="emptyCartCon">
        <div className="emptyCartTitle">سبد خرید</div>

        <div className="emptyCartBox">
          <img
            src="/empty-cart.png"
            alt="empty_cart"
            className="emptyCartImage"
          />

          <div className="emptyCartMessage">سبد خرید شما خالیه!</div>
        </div>
      </div>
    );
  if (userCartProductsLength)
    return (
      <div className="cartCon">
        {/* main content */}
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {/* header */}
          <div className="headerCon">
            <div className="cartHeader">
              <div className="cartHeaderTitle">سبد خرید شما</div>
              {userCartProductsLength > 0 && (
                <div className="cartItemCountCon">
                  <span className="cartItemCount">
                    {convertToPersianNumber(userCartProductsLength)}
                  </span>
                  <span className="cartItemCountLabel">عدد کالا</span>
                </div>
              )}
            </div>

            <button onClick={() => clearCart()} className="clearCartBtn">
              <div>حذف کل سبد خرید</div>
              <div>
                <span className="clearCartIconLg">
                  <Trash color="#ef4056" size={20} />
                </span>
                <span className="clearCartIconSm">
                  <Trash color="#ef4056" size={16} />
                </span>
              </div>
            </button>
          </div>
          {/* content */}

          <div className="contentCon">
            {userCartProducts.map((product, index) => {
              const discountPercent = getDiscountPercent(product);

              return (
                <div key={index} className="cartProductCard">
                  {/* remove product absolute*/}
                  <button
                    onMouseEnter={() =>
                      setIsRemoveProductHovered(product.order)
                    }
                    onMouseLeave={() => setIsRemoveProductHovered("")}
                    onClick={() => removeProduct(product.order)}
                    className="deleteProductBtn"
                  >
                    <span className="icon-lg">
                      <Trash2 size={20} color="#ef4056" />
                    </span>
                    <span className="icon-sm">
                      <Trash2 size={16} color="#ef4056" />
                    </span>
                  </button>
                  {/* remove product tooltip */}
                  {isRemoveProductHovered === product.order && (
                    <div className="remove-product-tooltip">حذف</div>
                  )}

                  {/* upper content */}

                  <div className="cart-product-root">
                    {/* title + seller */}
                    <div className="cart-product-info">
                      <div className="cart-product-title">{product.name}</div>

                      <div className="cart-product-meta">
                        {/* seller */}
                        <div className="meta-row">
                          <span className="icon-d24">
                            <Store color="#385086" size={24} />
                          </span>
                          <span className="icon-d20">
                            <Store color="#385086" size={20} />
                          </span>
                          <span className="icon-m18">
                            <Store color="#385086" size={18} />
                          </span>
                          <span className="meta-text">دیجی ایکس</span>
                        </div>

                        {/* warranty */}
                        <div className="meta-row">
                          <span className="icon-d24">
                            <BadgeCheck color="#385086" size={24} />
                          </span>
                          <span className="icon-d20">
                            <BadgeCheck color="#385086" size={20} />
                          </span>
                          <span className="icon-m18">
                            <BadgeCheck color="#385086" size={18} />
                          </span>
                          <span className="meta-text">
                            {convertToPersianNumber(18)} ماه گارانتی شرکتی
                          </span>
                        </div>

                        {/* shipping */}
                        {product.qty !== 0 && (
                          <div className="meta-row">
                            <span className="icon-d24">
                              <Truck color="#385086" size={24} />
                            </span>
                            <span className="icon-d20">
                              <Truck color="#385086" size={20} />
                            </span>
                            <span className="icon-m18">
                              <Truck color="#385086" size={18} />
                            </span>
                            <span className="meta-text">
                              موجود در انبار دیجی ایکس(ارسال فوری)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product image */}
                    <div className="cart-product-image-wrapper">
                      <img
                        className=" cart-product-image-box"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                    </div>
                  </div>

                  {/* price  */}

                  <div className="cartPriceCon">
                    {product.offPrice > 0 ? (
                      <div className="_cartProductContainer">
                        {/* discount percent and price */}
                        <div className="_cartPriceRow">
                          <div className="_cartDiscountPercent">
                            <span className="_cartDiscountIconDesktop">
                              <Percent strokeWidth={2.5} size={14} />
                            </span>
                            <span className="_cartDiscountIconMobile">
                              <Percent strokeWidth={2.5} size={12} />
                            </span>
                            <span className="_cartDiscountText">
                              {convertToPersianNumber(discountPercent || "33")}
                            </span>
                          </div>

                          <div className="_cartPriceValues">
                            <span className="_cartOriginalPrice">
                              {(
                                product.price * productCount(product)
                              ).toLocaleString("fa-IR")}
                            </span>
                            <span className="_cartDiscountedPrice">
                              {(
                                product.offPrice * productCount(product)
                              ).toLocaleString("fa-IR")}
                            </span>
                            <span className="_cartTomanLogo">
                              <TomanLogo />
                            </span>
                          </div>
                        </div>

                        {/* color and count control */}
                        <div className="_cartColorCountRow">
                          <div className="_cartColorBox">
                            <div
                              className="_cartColorCircle"
                              style={{
                                backgroundColor: getHexColor(product.color),
                              }}
                            ></div>
                            <span className="_cartColorLabel">
                              {getFarsiColor(product.color)}
                            </span>
                          </div>

                          <div className="_cartControlBar">
                            {/* increment */}
                            <button
                              onClick={() =>
                                increaseProductCount(product.order)
                              }
                              disabled={productCount(product) >= product.qty}
                              className="_cartIncrementBtn"
                            >
                              <span className="_cartIncrementIconDesktop">
                                <Plus size={22} color="#385086" />
                              </span>
                              <span className="_cartIncrementIconMobile">
                                <Plus size={18} color="#385086" />
                              </span>
                            </button>

                            {/* count */}
                            <div className="_cartCountDisplay">
                              <span className="_cartCountText">
                                {convertToPersianNumber(productCount(product))}
                              </span>
                              {productCount(product) === product.qty && (
                                <span className="_cartMaxLabel">حداکثر</span>
                              )}
                            </div>

                            {/* remove or decrease */}
                            <button
                              onClick={() =>
                                productCount(product) === 1
                                  ? removeProduct(product.order)
                                  : decreaseProductCount(product.order)
                              }
                              className="_cartDecrementBtn"
                            >
                              {productCount(product) === 1 ? (
                                <>
                                  <span className="_cartDecrementIconDesktop">
                                    <Trash2 size={20} color="#ef4056" />
                                  </span>
                                  <span className="_cartDecrementIconMobile">
                                    <Trash2 size={16} color="#ef4056" />
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="_cartDecrementIconDesktop">
                                    <Minus size={20} color="#385086" />
                                  </span>
                                  <span className="_cartDecrementIconMobile">
                                    <Minus size={16} color="#385086" />
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="__cartProductWrapper">
                        {/* price */}
                        <div className="__cartPriceRow">
                          <span className="__cartPriceText">
                            {(
                              product.price * productCount(product)
                            ).toLocaleString("fa-IR")}
                          </span>
                          <span className="__cartTomanLogo">
                            <TomanLogo />
                          </span>
                        </div>

                        {/* color and count control */}
                        <div className="__cartColorCountRow">
                          {/* color */}
                          <div className="__cartColorBox">
                            <div
                              className="__cartColorCircle"
                              style={{
                                backgroundColor: getHexColor(product.color),
                              }}
                            ></div>
                            <span className="__cartColorLabel">
                              {getFarsiColor(product.color)}
                            </span>
                          </div>

                          {/* control bar */}
                          <div className="__cartControlBar">
                            {/* increment */}
                            <button
                              onClick={() =>
                                increaseProductCount(product.order)
                              }
                              disabled={productCount(product) >= product.qty}
                              className="__cartIncrementBtn"
                            >
                              <span className="__cartIncrementIconDesktop">
                                <Plus size={22} color="#385086" />
                              </span>
                              <span className="__cartIncrementIconMobile">
                                <Plus size={18} color="#385086" />
                              </span>
                            </button>

                            {/* count */}
                            <div className="__cartCountDisplay">
                              <span className="__cartCountText">
                                {convertToPersianNumber(productCount(product))}
                              </span>
                              {productCount(product) === product.qty && (
                                <span className="__cartMaxLabel">حداکثر</span>
                              )}
                            </div>

                            {/* remove or decrease */}
                            <button
                              onClick={() =>
                                productCount(product) === 1
                                  ? removeProduct(product.order)
                                  : decreaseProductCount(product.order)
                              }
                              className="__cartDecrementBtn"
                            >
                              {productCount(product) === 1 ? (
                                <>
                                  <span className="__cartDecrementIconDesktop">
                                    <Trash2 size={20} color="#ef4056" />
                                  </span>
                                  <span className="__cartDecrementIconMobile">
                                    <Trash2 size={16} color="#ef4056" />
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="__cartDecrementIconDesktop">
                                    <Minus size={20} color="#385086" />
                                  </span>
                                  <span className="__cartDecrementIconMobile">
                                    <Minus size={16} color="#385086" />
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* aside */}
        <div className="asideCon">
          <div className="invoiceTitle">صورتحساب</div>

          <div className="invoiceCon">
            <div className="invoiceRow">
              <div className="invoiceLabel">
                <span>قیمت کالاها</span>
                <span>{`(${convertToPersianNumber(cartItemCount)})`}</span>
              </div>
              <div className="invoiceValue">
                <span className="invoicePrice">
                  {productPrices.toLocaleString("fa-IR")}
                </span>
                <span>
                  <TomanLogo />
                </span>
              </div>
            </div>

            <div className="invoiceRow">
              <div className="invoiceLabel">جمع سبد خرید</div>
              <div className="invoiceValue">
                <span>
                  {productOffPrices > 0
                    ? productOffPrices.toLocaleString("fa-IR")
                    : productPrices.toLocaleString("fa-IR")}
                </span>
                <span>
                  <TomanLogo />
                </span>
              </div>
            </div>

            {ProfitFromPurchase > 0 && (
              <div className="invoiceRow invoiceProfit">
                <div>
                  <span>سود شما از خرید</span>
                </div>
                <div className="invoiceValue">
                  <span className="profitPercent">{`(${convertToPersianNumber(
                    ProfitFromPurchaseDiscount
                  )}%)`}</span>
                  <span>{ProfitFromPurchase.toLocaleString("fa-IR")}</span>
                  <span>
                    <TomanLogo />
                  </span>
                </div>
              </div>
            )}

            <button disabled={true} className="checkoutBtn">
              ادامه خرید
            </button>
          </div>
        </div>
      </div>
    );
};
export default CartPage;
