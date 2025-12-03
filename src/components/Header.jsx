import { Link } from "react-router-dom";

import { ShoppingCart } from "lucide-react";
import { convertToPersianNumber } from "../utils/utils";
import Logo from "./MainLogo/Logo";
import { useCart } from "../modules/checkout/hooks/useCart";
import { allProducts } from "../data/data";

const Header = () => {
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

  return (
    <header className="header">
      {/* pcBanner */}
      <img src="/banner.gif" alt="" className="pcBanner" />

      {/* mobileBanner */}
      <img
        src="/mobilebanner.gif"
        alt="mobilebanner"
        className="mobileBanner"
      />

      {/*mobile sidebar */}

      {/*pc sidebar shown in more than 1024 devices */}

      {/* main header */}
      <div className="headerMain">
        {/* pc  */}
        {/* fixed part shown in more than 1024 devices*/}
        <div className="pcFixedHeader">
          {/* logo and searchbar */}
          <section
            style={{ display: "flex", alignItems: "center", columnGap: "24px" }}
            className=""
          >
            {/* logo */}
            <Logo />

            {/* searchbar */}
            <div style={{ minHeight: "56px" }}></div>
          </section>
          {/* auth and cart button  */}
          <section
            style={{ display: "flex", alignItems: "center", columnGap: "24px" }}
            className=""
          >
            {/* auth */}
            <div></div>
            {/* cart btn */}
            <Link className="cartBtn" to="/cart">
              <ShoppingCart size={24} />
              {/* cart item count */}
              <div
                style={cartItemCount === 0 ? { paddingBottom: "4px" } : {}}
                className="cartBadge"
              >
                {convertToPersianNumber(cartItemCount)}
              </div>
            </Link>
          </section>
        </div>

        {/*navbar shown in more than 1024 devices */}
        <nav className="pcNavbar">
          <Link className="navLink" to="mobile/iphone">
            گوشی آیفون
          </Link>
          <Link className="navLink" to="">
            گوشی سامسونگ
          </Link>
          <Link className="navLink" to="">
            گوشی شیائومی
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
