import { Link } from "react-router-dom";
import Logo from "./logo/logo";
import { ShoppingCart } from "lucide-react";
import { convertToPersianNumber } from "../utils/utils";

const Header = () => {
  const cartItemCount = 0;
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
          <Link to="">گوشی آیفون</Link>
          <Link to="">گوشی سامسونگ</Link>
          <Link to="">گوشی شیائومی</Link>
        </nav>
        {/* ******************************************************************************** */}

        {/* mobile and tablet */}
      </div>
    </header>
  );
};
export default Header;
