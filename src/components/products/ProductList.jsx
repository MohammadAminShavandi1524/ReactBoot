import { Box, Percent } from "lucide-react";
import {
  getDiscountPercent,
  convertToPersianNumber,
  getHexColor,
} from "../../utils/utils";
import AddToCartBtn from "../addToCartBtn/AddToCartBtn";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
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
  );
};
export default ProductList;
