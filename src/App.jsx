import Button from "react-bootstrap/Button";
import MainCarousel from "./components/MainCarousel/MainCarousel";


function App() {
  return (
    <div style={{ minHeight: "1000px" }}>
      {/* pc main carousel*/}
      <div className="">
        <MainCarousel
         
          autoSlide={false}
          autoSlideInterval={7000}
        />
      </div>
      {/*  mobile main carousel */}
      <div className=""></div>
    </div>
  );
}

export default App;
