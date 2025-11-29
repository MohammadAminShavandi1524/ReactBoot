import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "../Webfonts/fontiran.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div dir="rtl" style={{ fontFamily: "IRANYekanX" }} className="">
        <title>DigiX</title>
        <Header />
        <Routes>
          <Route index element={<App />} />
        </Routes>
      
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);
