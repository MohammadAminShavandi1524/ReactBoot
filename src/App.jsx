import "./App.css";

import Button from "react-bootstrap/Button";
import MainCarousel from "./components/MainCarousel/MainCarousel";
import ProductCarousel from "./components/pCarousel/ProductCarousel";

function App() {
  return (
    <div style={{ minHeight: "1000px" }}>
      {/* pc main carousel*/}
      <div className="">
        <MainCarousel autoSlide={false} autoSlideInterval={7000} />
      </div>

      <div className="landingCon">

        {/* <ProductCarousel /> */}

      </div>
    </div>
  );
}

export default App;
