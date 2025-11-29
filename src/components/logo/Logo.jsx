import "./Logo.css";

import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="headerLogoCon">
      <img src="/logo.png" alt="logo" className="headerLogoImage" />
      <div className="headerLogoText">
        <span style={{ color: "#0a7dc6", marginLeft: "4px" }}>دیجی</span>

        <span  style={{ color: "#fe5a06" }}>ایکس</span>
      </div>
    </Link>
  );
};
export default Logo;
