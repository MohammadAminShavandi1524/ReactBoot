import { ChevronUp } from "lucide-react";

const Footer = () => {
  return (
    <div className="footerCon">
      {/* mobile and tablet footer 1024 */}
      <div className="bg-primaryGradient mobileFooterCon">
        {/* header */}
        <div className="mobileFooterHeader">
          <div>
            <div
              className="logoText"
             
            >
              دیجی ایکس
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>بازگشت به بالا</span>
            <span>
              <ChevronUp strokeWidth="2" size="16" />
            </span>
          </button>
        </div>

        {/* footer */}
        <div className="pcFooterBottom">
          <div className="pcFooterBottomContent">
            <span>۱۴۰۴</span>
            <span>
              منابع اطلاعات: دیجی‌کالا | طراحی الهام‌گرفته از تکنولایف
            </span>
          </div>
        </div>
      </div>
      {/* pc footer */}
      <div className="bg-primaryGradient pcFooterCon">
        {/* header */}
        <div className="pcFooterHeader">
          <div style={{ fontSize: "36px", color: "white" }}>دیجی ایکس</div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="pcScrollTopBtn"
          >
            <span>بازگشت به بالا</span>
            <span>
              <ChevronUp strokeWidth="2.25" size="20" />
            </span>
          </button>
        </div>

        {/* footer */}
        <div className="pcFooterBottom">
          <div className="pcFooterBottomContent">
            <span>۱۴۰۴</span>
            <span>
              منابع اطلاعات: دیجی‌کالا | طراحی الهام‌گرفته از تکنولایف
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
