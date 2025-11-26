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
import { getProjects } from "../api/projectApi";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const api = import.meta.env.VITE_BACKEND_API;
  // ---------- state ----------
  const [projectsData, setProjectsData] = useState([]); // all projects from API
  const [filteredProjects, setFilteredProjects] = useState([]); // shown projects
  const [loading, setLoading] = useState(true);

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

  // ---------- fetch projects from API ----------
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(`${api}/projects/`);
  //       const json = await res.json();
  //       // API returns { count, next, previous, results: [...] }
  //       setProjectsData(json.results || []);
  //     } catch (err) {
  //       console.error("Failed fetching projects:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // ✅ Fetch data once when component mounts
    useEffect(() => {
      setLoading(true);
      getProjects()
        .then((data) => setProjectsData(data || []))
        .catch((error) => {
          console.error("Error fetching projects:", error);
        })
        .finally(() => setLoading(false));
    }, [api]);

  // ---------- apply filters ----------
  useEffect(() => {
    let result = Array.isArray(projectsData) ? [...projectsData] : [];

    // Filter by propertyType (category/subcategory)
    if (propertyType) {
      const lower = propertyType.toLowerCase();
      result = result.filter(
        (p) =>
          (p.category && p.category.toLowerCase().includes(lower)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(lower))
      );
    }

    // Filter by city (API gives string, not object)
    if (filters.city) {
      result = result.filter(
        (p) => (p.City || "").toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Filter by location (API: Project_Location)
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
  }, [projectsData, propertyType, filters]);

  // ---------- animations (Lenis + GSAP + SplitType) ----------
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      direction: "vertical",
      smoothTouch: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP small reveals (works with elements present)
    gsap.utils.toArray(".text-drop__line").forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
          },
        }
      );
    });

    gsap.utils.toArray(".text-drop__img-box").forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
          },
        }
      );
    });

    gsap.utils.toArray(".has-prlx").forEach((el) => {
      gsap.to(el, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []); // run once

  // split text animation (when fonts ready)
  useEffect(() => {
    document.fonts.ready.then(() => {
      gsap.set(".split2", { opacity: 1 });
      const elements = document.querySelectorAll(".split2");
      elements.forEach((el, i) => {
        const split = new SplitType(el, { types: "words", tagName: "span" });
        gsap.from(split.words, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "sine.out",
          stagger: 0.15,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    });
  }, []);

  // ---------- helper: unique lists for selects ----------
  const uniqueCities = [
    ...new Set(projectsData.map((p) => p.City).filter(Boolean)),
  ];

  const uniqueLocation = [
    ...new Set(projectsData.map((p) => p.Project_Location).filter(Boolean)),
  ];

  const uniqueConfigurations = [
    ...new Set(
      projectsData.flatMap((p) => p.Configuration || []).filter(Boolean)
    ),
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
    projectsData.find(
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
    let result = [...projectsData];

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
  if (loading) {
    return (
      <div className="text-center py-10">
        <Loader />
      </div>
    );
  }

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
          <h1 className="split2">{propertyType || "Our"} Projects</h1>
          <p className="text-drop__line split2">
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
                      <Link to={`/projects/${project.id}`}>
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
                          to={`/projects/${project.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p className="card-description fs-4">
                            {project.Title}
                          </p>
                        </Link>

                        <p className="fw-bold">{project.Price}</p>

                        <div className="pt-3">
                          <Link to={`/projects/${project.id}`}>
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
