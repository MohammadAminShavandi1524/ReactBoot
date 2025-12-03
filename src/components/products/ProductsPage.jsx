import { Link, useParams } from "react-router-dom";
import "./products.css";
import { ArrowDownWideNarrow, Box, Percent } from "lucide-react";

import { useState } from "react";
import {
  convertToPersianNumber,
  getDiscountPercent,
  getHexColor,
} from "../../utils/utils";
import { allProducts } from "../../data/data";
import AddToCartBtn from "../addToCartBtn/AddToCartBtn";
import ProductList from "./ProductList";
import OrderBar from "./OrderBar";

const ProductsPage = () => {
  const { brand } = useParams();

  const sortOptions = [
    { label: "بیشترین قیمت", value: "HighestPrice" },
    { label: "کم ترین قیمت", value: "LowestPrice" },
    { label: "بیشترین تخفیف", value: "BiggestDiscount" },
  ];
  const [sort, setSort] = useState("");

  const faBrand =
    brand === "iphone" ? "آیفون" : brand === "samsung" ? "سامسونگ" : "شیائومی";

  const products = [...allProducts].sort((a, b) => {
    switch (sort) {
      case "HighestPrice":
        return b.price - a.price;
      case "LowestPrice":
        return a.price - b.price;
      case "BiggestDiscount":
        const discountA = a.offPrice > 0 ? a.price - a.offPrice : 0;
        const discountB = b.offPrice > 0 ? b.price - b.offPrice : 0;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  return (
    <div style={{ minHeight: "1000px" }} className="productsCon">
      {/* breadCrump */}
      <div className="breadCrumpCon">
        <Link to={"/"}>فروشگاه اینترنتی دیجی ایکس</Link>
        <span>/</span>
        <Link to={``}>موبایل</Link>
        <span>/</span>
        <Link style={{ color: "black" }} to={`/mobile/${brand}`}>
          {faBrand}
        </Link>
      </div>
      <div className="productLayoutCon">
        {/* order bar */}

        <OrderBar
          products={products}
          setSort={setSort}
          sort={sort}
          sortOptions={sortOptions}
        />
        {/* products */}
        <ProductList products={products} />
      </div>
    </div>
  );
};
export default ProductsPage;
