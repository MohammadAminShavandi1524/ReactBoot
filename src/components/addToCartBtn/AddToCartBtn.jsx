import { ChevronLeft, ShoppingCart } from "lucide-react";
import "./AddToCartBtn.css";
import { Link } from "react-router-dom";
import { useCart } from "../../modules/checkout/hooks/useCart";
import { toast } from "react-toastify";

const AddToCartBtn = ({ product }) => {
  const { addProduct, isProductInCart } = useCart();

  return (
    <div className="Con">
      {isProductInCart(product.order) ? (
        <Link to={"/cart"} className="inCartBtnCon">
          <span className="inCartBtnText">مشاهده سبد خرید</span>
          <span className="inCartBtnIcon">
            <ChevronLeft size={20} />
          </span>
        </Link>
      ) : (
        <button
          onClick={() => {
            addProduct(product.order);
            toast.success(`این کالا به سبد خرید اضافه شد`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }}
          className="addToCartBtnCon"
        >
          <span className="addToCartBtnIcon">
            <ShoppingCart size={20} />
          </span>

          <span className="addToCartBtnText">افزودن به سبد خرید</span>
        </button>
      )}
    </div>
  );
};
export default AddToCartBtn;
