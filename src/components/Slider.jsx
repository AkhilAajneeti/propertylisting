import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import gsap from "gsap";
import SplitType from "split-type";
import { useNavigate } from "react-router-dom";
import getProjectsByCategory from "../api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/propertySlice";

export default function Slider() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  // const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Residential");
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ location: "" });
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
        });
      });
    });
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProjectsByCategory();
        setCategories(data.results || data || []);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const dispatch = useDispatch();
  const { data: projects} = useSelector((state) => state.projects);
  // ✅ Fetch data once when component mounts
  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects, projects?.length]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const selectedCategory = categories.find((cat) =>
      cat.name.toLowerCase().includes(tab.toLowerCase()),
    );

    if (selectedCategory) {
      navigate(`/projects?category=${selectedCategory.slug}`);
    } else {
      console.warn("Category not found yet");
    }
  };
  const uniqueLocation = [
    ...new Set(projects.map((p) => p.Project_Location).filter(Boolean)),
  ];
  // ---------- handlers ----------
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((s) => ({ ...s, [name]: value }));
  };

  const handleSearch = () => {
    let query = searchText || filters.location;
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
              src="/banner-6.jpeg"
              alt="Luxury Properties Delhi NCR"
              className="slide-img d-none d-sm-block"
              width="1920"
              height="600"
              loading="eager"
              decoding="async"
            />
            <img
              src="/mobBig-1.jpeg"
              alt="Luxury Properties Delhi NCR"
              className="slide-img d-sm-none"
              width="390"
              height="700"
              loading="eager"
              decoding="async"
            />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <img
              src="/banner-7.jpeg"
              alt="Top Commercial Property in NCR"
              className="slide-img d-none d-sm-block"
              width="1920"
              height="600"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/mobBig-2.jpeg"
              alt="Top Commercial Property in NCR"
              className="slide-img d-sm-none"
              width="390"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <img
              src="/banner-9.jpeg"
              alt="Invest in Premium Real Estate"
              className="slide-img d-none d-sm-block"
              width="1920"
              height="600"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/mobBig-1.jpeg"
              alt="Invest in Premium Real Estate"
              className="slide-img d-sm-none"
              width="390"
              height="700"
              loading="lazy"
              decoding="async"
            />
          </SwiperSlide>
        </Swiper>

        {/* 🔍 Search Section Overlay (Fixed over all slides) */}
        <div className="search-overlay">
          <h2 className="split2">
            Luxury Residential & Commercial Properties in  PAN India
          </h2>
          <p className="text-center">
            Get Trusted Real Estate Advisory Services for Both Investors and
            End-Users.
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
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  disabled={!uniqueLocation.length}
                >
                  <option value="">Location</option>
                  {(uniqueLocation || []).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
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
