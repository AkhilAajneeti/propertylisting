import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../index.css"; // your custom styles
import gsap from "gsap";
import SplitType from "split-type";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Residential");
  useEffect(() => {
    document.fonts.ready.then(() => {
      gsap.set(".split2", { opacity: 1 });

      const elements = document.querySelectorAll(".split2");

      elements.forEach((el, i) => {
        // Split text into words
        const split = new SplitType(el, { types: "words", tagName: "span" });

        // Animate words
        gsap.from(split.words, {
          opacity: 0,
          y: 40, // slide up
          duration: 1,
          ease: "sine.out",
          stagger: 0.08,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    });
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // 👇 Navigate to a page based on tab
    if (tab === "Residential") navigate("/projects?propertytype=Residential");
    else if (tab === "Commercial")
      navigate("/projects?propertytype=Commercial");
    else if (tab === "Plots") navigate("/projects?propertytype=Plots");
  };
  const handleSearch = () => {
    let query = searchText || location;
    if (!query) return;

    navigate(`/search-projects?q=${encodeURIComponent(query)}`);
  };
  return (
    <>
      <div className="slider-wrapper">
        <Swiper
          spaceBetween={0}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
          loop={true}
          speed={1200}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <img
              src="/banner-6.png"
              alt="Banner 1"
              className="slide-img d-none d-sm-block"
            />
            <img
              src="/mobBig-1.png"
              alt="Banner 1"
              className="slide-img d-sm-none"
            />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <img
              src="/banner-8.png"
              alt="Banner 2"
              className="slide-img d-none d-sm-block"
            />
            <img
              src="/mobBig-2.png"
              alt="Banner 2"
              className="slide-img d-sm-none"
            />
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <img
              src="/banner-9.png"
              alt="Banner 3"
              className="slide-img d-none d-sm-block"
            />
            <img
              src="/mobBig-1.png"
              alt="Banner 3"
              className="slide-img d-sm-none"
            />
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <img
              src="/banner-8.png"
              alt="Banner 4"
              className="slide-img d-none d-sm-block"
            />
            <img
              src="/mobBig-2.png"
              alt="Banner 4"
              className="slide-img d-sm-none"
            />
          </SwiperSlide>
        </Swiper>

        {/* 🔍 Search Section Overlay (Fixed over all slides) */}
        <div className="search-overlay">
          <h2 className="split2">Discover Most Suitable Property</h2>
          <p className="text-center">
            Building credibility, increasing customer loyalty, and creating
            empowerment.
          </p>
          <div className="">
            {/* Tabs */}
            <div className="tabs">
              {["Residential", "Commercial", "Plots"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Location + Search */}
            <div className="search-box ">
              <div className="location-input justify-content-center">
                <FaMapMarkerAlt
                  className="icon"
                  style={{ color: "rgb(205 181 112)" }}
                />
                <select onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Select Location</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Noida">Noida</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Search property or builders"
                className="property-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
