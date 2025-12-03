import { ChevronLeft, ChevronRight } from "lucide-react";
import "./MainCarousel.css";
import { useState, useEffect } from "react";

const mainCarouselPcOptions = [
  {
    img: "/mainCarousel/iphone.webp",
    alt: "iphone",
    href: "/mobile/iPhone",
  },
  {
    img: "/mainCarousel/monitor.webp",
    alt: "monitor",
    href: "/Monitor",
  },
  {
    img: "/mainCarousel/laptop.webp",
    alt: "laptop",
    href: "/laptop",
  },
  {
    img: "/mainCarousel/samsung.png",
    alt: "samsung",
    href: "/mobile/samsungPhone",
  },
  {
    img: "/mainCarousel/smartwatch.webp",
    alt: "smartwatch",
    href: "/SmartWatch",
  },
  {
    img: "/mainCarousel/tablet.webp",
    alt: "tablet",
    href: "/tablet",
  },
  {
    img: "/mainCarousel/samANDxia.webp",
    alt: "samANDxia.webp",
    href: "/mobile?brand=samsung,xiaomi",
  },
];

const mainCarouselMobileOptions = [
  {
    img: "/mainCarousel/mobile/samsung.webp",
    alt: "samsung",
    href: "/mobile/samsungPhone",
  },
  {
    img: "/mainCarousel/mobile/iphone.png",
    alt: "iphone",
    href: "/mobile/iPhone",
  },
  {
    img: "/mainCarousel/mobile/mobile.png",
    alt: "mobile",
    href: "/mobile",
  },
  {
    img: "/mainCarousel/mobile/laptop.png",
    alt: "laptop",
    href: "/laptop",
  },
  {
    img: "/mainCarousel/mobile/monitor.webp",
    alt: "monitor",
    href: "/Monitor",
  },
  {
    img: "/mainCarousel/mobile/smartwatch.png",
    alt: "smartwatch",
    href: "/SmartWatch",
  },
  {
    img: "/mainCarousel/mobile/tablet.png",
    alt: "tablet",
    href: "/tablet",
  },
];

const MainCarousel = ({ autoSlide = false, autoSlideInterval = 3000 }) => {
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(pcNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const [pcCurr, setPcCurr] = useState(0);
  const pcPrev = () =>
    setPcCurr((pcCurr) =>
      pcCurr === 0 ? mainCarouselPcOptions.length - 1 : pcCurr - 1
    );
  const pcNext = () =>
    setPcCurr((pcCurr) =>
      pcCurr === mainCarouselPcOptions.length - 1 ? 0 : pcCurr + 1
    );

  // ** mobile
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(mobileNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const [mobileCurr, setMobileCurr] = useState(0);
  const mobilePrev = () =>
    setMobileCurr((mobileCurr) =>
      mobileCurr === 0 ? mainCarouselMobileOptions.length - 1 : mobileCurr - 1
    );
  const mobileNext = () =>
    setMobileCurr((mobileCurr) =>
      mobileCurr === mainCarouselMobileOptions.length - 1 ? 0 : mobileCurr + 1
    );

  return (
    <div>
      {/* pc */}
      <div className="pcMainCarousel">
        <div className="CarouselCon">
          <div
            className="carouselContent"
            style={{ transform: `translateX(${pcCurr * 100}%)` }}
          >
            {mainCarouselPcOptions.map((option, index) => {
              return (
                <div key={index}>
                  <img src={option.img} alt={option.alt} className="image" />
                </div>
              );
            })}
          </div>
          {/* next and prev */}
          <div className="controllBarCon">
            <button onClick={pcPrev} className="controllBar">
              <ChevronRight size={28} />
            </button>
            <button onClick={pcNext} className="controllBar">
              <ChevronLeft size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="mobileMainCarousel">
        <div className="CarouselCon">
          <div
            className="carouselContent"
            style={{ transform: `translateX(${mobileCurr * 100}%)` }}
          >
            {mainCarouselMobileOptions.map((option, index) => {
              return (
                <div key={index}>
                  <img
                    src={option.img}
                    alt={option.alt}
                    className="mobileImage"
                  />
                </div>
              );
            })}
          </div>
          {/* next and prev */}
          <div className="controllBarCon">
            <button onClick={mobilePrev} className="controllBar prevBtn">
              <ChevronRight size={28} />
            </button>
            <button onClick={mobileNext} className="controllBar nextBtn">
              <ChevronLeft size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainCarousel;
