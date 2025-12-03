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
                          isSelected
                            ? { fontWeight: "500", color: "#004b68" }
                            : {}
                        }
                        onClick={() =>
                          isSelected ? setSort("") : setSort(option.value)
                        }
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
                        isSelected
                          ? { fontWeight: "500", color: "#004b68" }
                          : {}
                      }
                      onClick={() =>
                        isSelected ? setSort("") : setSort(option.value)
                      }
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

        {/* products */}
        <div>
          {/* mobile product list */}
          <div className="mobileProductList">
            {products.map((product, index) => {
              const discountPercent = getDiscountPercent(product);

              return (
                <div
                  className="mobileProductCard"
                  style={!product.offPrice ? { paddingTop: "30px" } : {}}
                  key={index}
                >
                  {/* بخش نشون دادن تخفیف  */}

                  {product.offPrice > 0 && (
                    <div className="mobileDiscountCon">
                      <div className="discountTitle">
                        {discountPercent && discountPercent > 5
                          ? "پیشنهاد شگفت انگیز"
                          : "فروش ویژه"}
                      </div>

                      <div className="discountBar"></div>
                    </div>
                  )}

                  <div className="gridCon">
                    {/* title qty */}

                    <div className="titleQtyCon">
                      {/* title */}
                      <div className="mobileTitle productlist-mobiletitle ">
                        {product.name}
                      </div>

                      {/* quntity */}

                      <div className="mobileProductQty">
                        {product.qty < 3 && (
                          <div className="productStockCon">
                            <Box size={16} />
                            <span>{convertToPersianNumber(product.qty)}</span>
                            <span>عدد باقی مانده</span>
                          </div>
                        )}
                      </div>

                      {/* price */}

                      {product.offPrice > 0 ? (
                        <div className="__priceConDiscount">
                          <div className="__discountPercent">
                            <span>
                              <Percent strokeWidth={2.5} size={14} />
                            </span>
                            <span>
                              {convertToPersianNumber(discountPercent || "33")}
                            </span>
                          </div>

                          <div className="__price">
                            <span className="__priceValue">
                              {product.offPrice.toLocaleString("fa-IR")}
                            </span>
                            <span className="__priceUnit">تومان</span>
                          </div>

                          <div className="__offPrice">
                            <span className="__offPriceValue">
                              {product.price.toLocaleString("fa-IR")}
                            </span>
                            <span className="__offPriceUnit">تومان</span>
                          </div>
                        </div>
                      ) : (
                        <div className="_priceCon">
                          <span className="_priceValue">
                            {product.price.toLocaleString("fa-IR")}
                          </span>
                          <span className="_priceUnit">تومان</span>
                        </div>
                      )}
                    </div>
                    {/* image and colors */}
                    <div className="imageAndColorCon">
                      {/* تصویر */}
                      <img
                        src={product.imageUrl}
                        alt={`${product.name}`}
                        width={160}
                        height={160}
                        style={{ marginBottom: "16px" }}
                      />

                      {/* دایره رنگ ها  */}
                      <div className="">
                        <div
                          style={
                            product.color === "White"
                              ? {
                                  backgroundColor: getHexColor(product.color),
                                  borderWidth: "1px",
                                  borderStyle: "solid",
                                  borderColor: "#b4b4b4",
                                }
                              : {
                                  backgroundColor: getHexColor(product.color),
                                }
                          }
                          className="colorInfo"
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* add to cart btn */}
                  <AddToCartBtn product={product} />
                </div>
              );
            })}
          </div>

          {/* s: product list  */}
          <div className="sProductList">
            {products.map((product, index) => {
              const discountPercent = getDiscountPercent(product);

              return (
                <div className="productCard" key={index}>
                  {/* بخش نشون دادن تخفیف  */}

                  {product.offPrice > 0 && (
                    <div className="discountCon">
                      <div className="discountTitle">
                        {discountPercent && discountPercent > 5
                          ? "پیشنهاد شگفت انگیز"
                          : "فروش ویژه"}
                      </div>

                      <div className="discountBar"></div>
                    </div>
                  )}

                  {/* دایره رنگ ها  */}
                  <div className="colorInfoCon">
                    <div
                      style={
                        product.color === "White"
                          ? {
                              backgroundColor: getHexColor(product.color),
                              borderWidth: "1px",
                              borderStyle: "solid",
                              borderColor: "#b4b4b4",
                            }
                          : {
                              backgroundColor: getHexColor(product.color),
                            }
                      }
                      className="colorInfo"
                    ></div>
                  </div>

                  {/* تصویر */}
                  <div className="productImageCon">
                    <img
                      src={product.imageUrl}
                      alt="product"
                      width={206}
                      height={206}
                    />
                  </div>
                  {/* title */}
                  <div className="productlist-title productTitle">
                    {product.name}
                  </div>
                  {/* quntity */}

                  <div className="productQty">
                    {product.qty < 3 && (
                      <div className="productStockCon">
                        <Box size={16} />
                        <span>{convertToPersianNumber(product.qty)}</span>
                        <span>عدد باقی مانده</span>
                      </div>
                    )}
                  </div>

                  {/* price - offPrice - decount percent */}

                  {product.offPrice > 0 ? (
                    <div className="productPriceCon">
                      {/* discount percent */}
                      <div className="discountPercent">
                        <span>
                          <Percent strokeWidth={2.5} size={14} />
                        </span>
                        <span className="discountPercentText">
                          {convertToPersianNumber(discountPercent || "33")}
                        </span>
                      </div>

                      {/* price */}
                      <div className="priceCon">
                        <span className="offPrice">
                          {product.offPrice.toLocaleString("fa-IR")}
                        </span>
                        <span className="currency">تومان</span>
                      </div>

                      {/* original price */}
                      <div className="originalPrice">
                        <span className="originalPriceValue">
                          {product.price.toLocaleString("fa-IR")}
                        </span>
                        <span className="currency">تومان</span>
                      </div>
                    </div>
                  ) : (
                    <div className="noDiscountPriceCon">
                      <span className="noDiscountPriceValue">
                        {product.price.toLocaleString("fa-IR")}
                      </span>
                      <span className="noDiscountCurrency">تومان</span>
                    </div>
                  )}

                  {/* add to cart btn */}
                  <AddToCartBtn product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
