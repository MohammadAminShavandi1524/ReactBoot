import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "../Webfonts/fontiran.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";

import CartPage from "./components/cart/CartPage.jsx";
import ProductsPage from "./components/products/ProductsPage.jsx";
import { ScrollToTop } from "./components/ScrollToTop.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <div
        dir="rtl"
        style={{ fontFamily: "IRANYekanX", backgroundColor: "#fcfeff" }}
        className=""
      >
        <title>DigiX</title>
        <Header />
        <Routes>
          <Route index element={<App />} />
          <Route path="mobile/:brand" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  </StrictMode>
);
