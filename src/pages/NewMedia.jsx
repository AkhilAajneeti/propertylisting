import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { PiClockClockwiseLight } from "react-icons/pi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/slices/newsSlice";
import Loader from "../components/Loader";

gsap.registerPlugin(ScrollTrigger, SplitText);
const NewMedia = () => {
  // requirements
  const dispatch = useDispatch();
  const { data: News, loading, error } = useSelector((state) => state.news);

  const [filteredNews, setFilteredNews] = useState([]);
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  // Fetch News
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    const elements = document.querySelectorAll(".text-animate");

    document.fonts.ready.then(() => {
      elements.forEach((el) => {
        const split = new SplitText(el, { types: "words" });

        gsap.from(split.words, {
          opacity: 0,
          y: 30,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Filter Function
  useEffect(() => {
    let filtered = [...News];

    if (category !== "All") {
      filtered = filtered.filter((i) => i?.newscategory === category);
    }

    if (year !== "All") {
      filtered = filtered.filter((i) => {
        const itemYear = i?.date
          ? new Date(i.date).getFullYear().toString()
          : "";
        return itemYear === year;
      });
    }

    setFilteredNews(filtered);
  }, [category, year, News]);

  const handleClear = () => {
    setCategory("All");
    setYear("All");
    setFilteredNews(News);
  };
  if (loading) return <Loader />;
  if (error) return <p className="text-danger">{error}</p>;
 if (!News?.length) return <p className="text-center mt-5">No News Available</p>;
  return (
    <div>
      <div>
        <div
          className=" position-relative"
          style={{ height: "550px", width: "100vw" }}
        >
          {News.length > 0 && News[0].video ? (
            <video
              className="object-fit-cover"
              style={{
                height: "550px",
                width: "100vw",
                filter: "brightness(0.6)",
              }}
              autoPlay
              loop
              muted
            >
              <source src={News[0].video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={
                News.length > 0
                  ? News[0].banner2 || News[0].image
                  : "/fallbackBanner.jpg"
              }
              alt="banner"
              style={{
                height: "550px",
                width: "100vw",
                objectFit: "cover",
                filter: "brightness(0.6)",
              }}
            />
          )}
        </div>

        <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-100">
          <div
            className="text-center pt-5 mt-5 mt-lg-0"
            style={{ fontFamily: "font1" }}
          >
            <div
              className="text-uppercase text-light text-animate fs-30"
            >
              {News[0]?.title || "News & Media"}
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="container NewTag p-4 my-5 rounded d-flex align-items-center justify-content-between">
        {/* Left Section */}
        <div>
          <h2 className="h4 fw-bold text-dark mb-0">Media Relations Contact</h2>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Image */}
          <img
            src="/channelpartner.png" // Replace with your image path
            alt="Ayushi"
            className="rounded"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />

          {/* Text */}
          <div className="d-flex flex-column">
            <span className="fw-semibold text-dark">Ayushi</span>
            <div className="blankDiv"></div>
            <span className="text-secondary small">Head - Media Relations</span>
            <a
              href="mailto:arun.chitnis@gmail.com"
              className="text-decoration-none text-primary small mt-1"
            >
              arun.chitnis@abc.com
            </a>
          </div>
        </div>
      </div>

      {/* filter section */}
      <div className="container py-3">
        {/* Top Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          {/* Left Section */}
          <div className="d-flex align-items-center">
            <h2 className="fw-bold text-dark mb-0 me-3">Filters</h2>
            <span className="text-secondary me-3">|</span>
            <button
              className=" p-0 text-decoration-none text-purple fw-semibold border-none"
              onClick={handleClear}
            >
              Clear Filters
            </button>
          </div>

          {/* Right Section */}
          <div className="d-flex flex-wrap align-items-center mt-3 mt-md-0">
            {/* Search Icon */}
            <div className="px-3">
              <FaSearch
                style={{
                  color: "#a136aa",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Category Dropdown */}
            <div className="px-3 border-start border-2 border-light-subtle">
              <span className="me-2 text-dark fw-semibold">Category</span>
              <select
                className="form-select form-select-sm d-inline-block"
                style={{ width: "120px" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                {Array.from(new Set(News.map((item) => item.newscategory))).map(
                  (cat) => (
                    <option key={cat}>{cat}</option>
                  )
                )}
              </select>
            </div>

            <div className="px-3 border-start border-2 border-light-subtle">
              <span className="me-2 text-dark fw-semibold">Year</span>
              <select
                className="form-select form-select-sm d-inline-block"
                style={{ width: "80px" }}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option>All</option>
                {Array.from(
                  new Set(News.map((item) => new Date(item.date).getFullYear()))
                ).map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(to right, #fcb045, #fd1d1d, #833ab4, #007bff)",
          }}
        ></div>

        <div className="my-5">
          <div className="row g-4">
            {filteredNews.map((news) => (
              <div className="col-lg-4 col-md-6 blog-card" key={news.id}>
                <div className="card shadow-sm border-0">
                  <div className="card-img-wrapper rounded-2 overflow-hidden">
                    <img
                      src={news.image}
                      className="card-img-top"
                      alt={news.title}
                    />
                  </div>
                  <div className="card-body">
                    <div className="text-uppercase small text-muted fw-semibold mb-2">
                      Author – {news.author}
                    </div>
                    <Link
                      to={`/insight/news&media/${news.id}/${news.newsslug}`}
                    >
                      <h5 className="card-title fw-bold">{news.title}</h5>
                    </Link>
                    <p className="card-text text-muted">
                      {news.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                      ...
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex justify-content-between text-muted small">
                    <span>
                      <PiClockClockwiseLight /> {news.readTime}
                    </span>
                    <span>
                      <a href="" className="NewsLink">
                        {news.date} <FaArrowRight />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* bottom section */}

      <div className="container py-4">
        {/* Top gradient line */}
        <div
          className="mb-4"
          style={{
            height: "2px",
            background:
              "linear-gradient(to right, #fcb045, #fd1d1d, #833ab4, #007bff)",
          }}
        ></div>

        {/* Press Kit Row */}
        <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
          <div
            className="d-flex align-items-center"
            style={{ borderLeft: "4px solid #9c27b0" }}
          >
            <div
              style={{
                height: "100%",
                width: "4px",
                backgroundColor: "#9c27b0",
                marginRight: "10px",
              }}
            ></div>
            <h5
              className="mb-0 text-uppercase fw-bold"
              style={{ color: "#9c27b0" }}
            >
              Press Kit
            </h5>
          </div>
          <button
            className="btn border-0 text-dark"
            style={{
              background:
                "linear-gradient(68deg, #be973e 3.99%, #f5ebac 55.49%, #b49249 100%)",
              fontWeight: "500",
              fontSize: "25px",
            }}
          >
            Download
          </button>
        </div>

        {/* Management Profiles Row */}
        <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
          <div
            className="d-flex align-items-center"
            style={{ borderLeft: "4px solid #9c27b0" }}
          >
            <div
              style={{
                height: "100%",
                width: "4px",
                backgroundColor: "#9c27b0",
                marginRight: "10px",
              }}
            ></div>
            <h5
              className="mb-0 text-uppercase fw-bold"
              style={{ color: "#9c27b0" }}
            >
              Management Profiles
            </h5>
          </div>
          <Link to="/our-team">
            <button
              className="btn border-0 text-dark"
              style={{
                background:
                  "linear-gradient(68deg, #be973e 3.99%, #f5ebac 55.49%, #b49249 100%)",
                fontWeight: "500",
                fontSize: "25px",
              }}
            >
              View Profiles
            </button>
          </Link>
        </div>

        {/* Bottom gradient line */}
        <div
          className="mt-4"
          style={{
            height: "2px",
            background:
              "linear-gradient(to right, #fcb045, #fd1d1d, #833ab4, #007bff)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default NewMedia;
