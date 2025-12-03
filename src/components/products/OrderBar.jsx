import { ArrowDownWideNarrow } from "lucide-react";
import "./OrderBar.css";
import { convertToPersianNumber } from "../../utils/utils";

const OrderBar = ({sortOptions , sort , setSort , products}) => {
  return (
    <div className="orderbarCon">
      <div className="orderbar">
        {/* pc */}
        <>
          {/* pcOrders */}
          <div className="pcOrders">
            {/* order logo */}
            <div className="orderLogoCon">
              <span>
                <ArrowDownWideNarrow size={20} color="#333333" />
              </span>
              <span style={{ fontWeight: "500" }}>ترتیب :</span>
            </div>
            {/* order tags */}
            <div className="orderTagsCon">
              {sortOptions.map((option, index) => {
                const isSelected = option.value === sort;
                return (
                  <div
                    className="orderTag"
                    style={
                      isSelected ? { fontWeight: "500", color: "#004b68" } : {}
                    }
                    onClick={() => {
                      isSelected ? setSort("") : setSort(option.value);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    key={index}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
          {/* total products */}
          <div className="TPCon">
            <span>{convertToPersianNumber(products.length)}</span>
            <span>کالا</span>
          </div>
        </>

        {/* mobile */}
        <>
          {/* mobileOrders */}

          <div className="mobileOrders">
            {sortOptions.map((option, index) => {
              const isSelected = option.value === sort;
              return (
                <div
                  className="orderTag"
                  style={
                    isSelected ? { fontWeight: "500", color: "#004b68" } : {}
                  }
                  onClick={() => {
                    isSelected ? setSort("") : setSort(option.value);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  key={index}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </>
      </div>
    </div>
  );
};
export default OrderBar;
