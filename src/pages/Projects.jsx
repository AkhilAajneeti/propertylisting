import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBriefcase, FaRegBuilding } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/propertySlice";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const dispatch = useDispatch();
  const {
    data: projects,
    loading,
    error,
  } = useSelector((state) => state.projects);
  // ---------- state ----------

  const [filteredProjects, setFilteredProjects] = useState([]); // shown projects

  // filters state (controlled)
  const [filters, setFilters] = useState({
    city: "",
    location: "",
    configuration: "",
  });

  // const bannerRef = useRef(null);

  // ---------- read query params ----------
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propertyType = params.get("propertytype"); // e.g. "Commercial"
  const urlCity = params.get("city") || "";

  // initialize city filter from url if provided
  useEffect(() => {
    if (urlCity) {
      setFilters((s) => ({ ...s, city: urlCity }));
    }
  }, [urlCity]);

  // ✅ Fetch data once when component mounts
  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects, projects?.length]);

  // ---------- apply filters ----------
  useEffect(() => {
    let result = Array.isArray(projects) ? [...projects] : [];

    // Filter by propertyType (category/subcategory)
    if (propertyType) {
      const lower = propertyType.toLowerCase();
      result = result.filter(
        (p) =>
          (p.category && p.category.toLowerCase().includes(lower)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(lower))
      );
    }

    // Filter by city
    if (filters.city) {
      result = result.filter(
        (p) => (p.City || "").toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Filter by location
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(
        (p) =>
          (p.Project_Location || "").toLowerCase().includes(loc) ||
          (p.City || "").toLowerCase().includes(loc)
      );
    }

    // Filter by configuration
    if (filters.configuration) {
      const cfg = filters.configuration.toLowerCase();
      result = result.filter((p) =>
        Array.isArray(p.Configuration)
          ? p.Configuration.some((c) => (c || "").toLowerCase() === cfg)
          : false
      );
    }

    setFilteredProjects(result);
  }, [projects, propertyType, filters]);

  // split text animation (when fonts ready)
  useEffect(() => {
    // cleanup previous SplitText instances
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.set(".split2", { clearProps: "all" });

    document.fonts.ready.then(() => {
      const elements = document.querySelectorAll(".split2");

      elements.forEach((el) => {
        const split = new SplitType(el, { types: "words" });

        gsap.from(split.words, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "sine.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      });
    });
  }, [propertyType]); // 🔥 Re-run animation when dropdown link clicked

  // ---------- helper: unique lists for selects ----------
  const uniqueCities = [
    ...new Set(projects.map((p) => p.City).filter(Boolean)),
  ];
  const uniqueLocation = [
    ...new Set(projects.map((p) => p.Project_Location).filter(Boolean)),
  ];
  const uniqueConfigurations = [
    ...new Set(projects.flatMap((p) => p.Configuration || []).filter(Boolean)),
  ];

  // ---------- handlers ----------
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((s) => ({ ...s, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ city: "", location: "", configuration: "" });
  };

  // ---------- banner logic ----------
  const activeBannerProject =
    projects.find(
      (p) =>
        (propertyType &&
          (p.category || "")
            .toLowerCase()
            .includes(propertyType.toLowerCase())) ||
        (propertyType &&
          (p.subcategory || "")
            .toLowerCase()
            .includes(propertyType.toLowerCase()))
    ) || null;

  const activeBanner = {
    bannerImage: activeBannerProject?.Bann1 || "/banner-9.png",
    bannerVideo: activeBannerProject?.bannerVideo || "",
    category: activeBannerProject?.category || "Our",
    content: activeBannerProject?.Highlights || "",
  };

  const handleSearch = () => {
    let result = [...projects];

    if (propertyType) {
      const lower = propertyType.toLowerCase();
      result = result.filter(
        (p) =>
          (p.category && p.category.toLowerCase().includes(lower)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(lower))
      );
    }

    if (filters.city) {
      result = result.filter(
        (p) => (p.City || "").toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.location) {
      result = result.filter(
        (p) =>
          (p.Project_Location || "").toLowerCase() ===
          filters.location.toLowerCase()
      );
    }

    if (filters.configuration) {
      const cfg = filters.configuration.toLowerCase();
      result = result.filter((p) =>
        Array.isArray(p.Configuration)
          ? p.Configuration.some((c) => (c || "").toLowerCase() === cfg)
          : false
      );
    }

    setFilteredProjects(result);
  };

  // ---------- loading fallback ----------
  if (loading) return <Loader />;

  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div>
      {/* Banner */}
      <div className="projectBanner position-relative">
        {activeBanner.bannerVideo ? (
          <video
            src={activeBanner.bannerVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-100"
          />
        ) : (
          <img
            src={activeBanner.bannerImage}
            alt={`${activeBanner.category} Banner`}
            className="w-100"
            style={{ height: "70vh", objectFit: "cover" }}
          />
        )}

        <div className="banner-content position-absolute top-50 start-50 translate-middle text-white text-center">
          <h1 className="">{propertyType || "Our"} Projects</h1>
          <p className="text-drop__line split2 text-center">
            {/* {activeBanner.content || "Browse through our diverse portfolio"} */}
            {"Browse through our diverse portfolio"}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container">
        <div className="filter-bar">
          <h2 className="filter-title text-gradient2">Filter By</h2>

          <div className="filter-controls">
            {/* City */}
            <div className="filter-select">
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              >
                <option value="">City</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <FaLocationDot className="select-icon" />
            </div>

            {/* Location (free text) */}
            <div className="filter-select">
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">Location</option>
                {uniqueLocation.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <FaRegBuilding className="select-icon" />
            </div>

            {/* Configuration */}
            <div className="filter-select">
              <select
                name="configuration"
                value={filters.configuration}
                onChange={handleFilterChange}
              >
                <option value="">Configuration</option>
                {uniqueConfigurations.map((cfg) => (
                  <option key={cfg} value={cfg}>
                    {cfg}
                  </option>
                ))}
              </select>
              <FaBriefcase className="select-icon" />
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <button className="search-btn" onClick={handleSearch}>
              Search &nbsp; <CiSearch />
            </button>

            <button className="search-btn" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container py-5">
        <div className="row gy-5">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="col-sm-4" key={project.id}>
                <div className="cards-3 section-gray text-drop__img-box">
                  <div className="card card-blog">
                    <div className="card-image news-box-items">
                      <Link to={`/projects/${project.id}/${project.project_slug}`}>
                        <div className="news-image">
                          <img
                            src={project.Bann1 || project.Proj_Logo}
                            alt={project.Title}
                            style={{
                              height: "264px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                      <div className="ripple-cont"></div>
                    </div>

                    <div className="table p-3">
                      <div className="ele-1">
                        <h6 className="category text-info">
                          {project.City}{" "}
                          {project.Project_Location
                            ? `| ${project.Project_Location}`
                            : ""}
                        </h6>

                        <Link
                          to={`/projects/${project.id}/${project.project_slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p className="card-description fs-4">
                            {project.Title}
                          </p>
                        </Link>

                        <p className="fw-bold">{project.Price}</p>

                        <div className="pt-3">
                          <Link to={`/projects/${project.id}/${project.project_slug}`}>
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No projects found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
