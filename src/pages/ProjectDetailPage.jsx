import React, { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
import { useParams } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import ProjectSlider from "../components/ProjectSlider";
import FloorPlan from "../components/FloorPlan";
import DetailPageNavbar from "../components/DetailPageNavbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import ContactBtn from "../components/ContactBtn";
import { getProjectsById } from "../api/projectApi";
const ProjectDetailPage = () => {
  const api = import.meta.env.VITE_BACKEND_API;
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // Fetch project
  useEffect(() => {
    getProjectsById(id)
      .then((data) => setProject(data))
      .catch((err) => console.log("Error fetching blog details:", err));
  }, [id]);

  //pixel code
  useEffect(() => {
    if (project?.gtm_id) {
      const script = document.createElement("script");
      script.innerHTML = project.gtm_id;
      script.type = "text/javascript";
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script); // cleanup on route change
      };
    }
  }, [project]);

  // Animations
  useEffect(() => {
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

    ScrollTrigger.normalizeScroll(true);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

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
          scrollTrigger: { trigger: line, start: "top 85%" },
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
          scrollTrigger: { trigger: img, start: "top 80%" },
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

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

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
          stagger: 0.2,
          delay: i * 0.3,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });
  }, []);

  // navbar
  useEffect(() => {
    const stickyWrapper = document.querySelector(".detail-sticky-nav");

    gsap.fromTo(
      stickyWrapper,
      { y: "-100%", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ProjectBanner",
          start: "bottom top+=10",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${api}/projects/${id}/enquiry/`, form);

      if (res.status === 201 || res.status === 200) {
        // OPTIONAL: Toast
        toast.success("Thank you! Redirecting...");
      }
    } catch (error) {
      console.error("Enquiry Submit Error:", error);
      alert("Something went wrong. Try again!");
    }
  };

  if (!project)
    return (
      <p className="text-center py-5">
        <Loader />
      </p>
    );

  return (
    <>
      {/* ================== BANNER ================== */}
      <div
        className="ProjectBanner position-relative"
        style={{
          backgroundImage: `url(${project.Bann1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="banner-content position-absolute top-50 start-50 translate-middle text-center projectBanner ">
          <h1 className="split2">{project.Title}</h1>
          <h5 className="text-drop__line split2 text-center">
            {project.Project_Location}, {project.City}
          </h5>
          <p className="text-drop__line split2 text-center">
            {project.Configuration} Estates
          </p>
          <p className="text-drop__line split2 text-center">
            Starting Price : {project.Price}
          </p>
        </div>
        <div className="overlay"></div>
      </div>

      <div className="detail-sticky-nav">
        <DetailPageNavbar project={project} />
      </div>

      {/* ================== MAIN CONTENT ================== */}
      <div className="container py-5 projectDetail">
        <div className="row">
          <div className="col-sm-8">
            {/* SLIDER */}
            <ProjectSlider
              images={[
                project.Bann1,
                project.Bann2,
                project.Bann3,
                ...(project.gallery_images || []),
              ]}
            />

            {/* OVERVIEW */}
            <div className="overview py-5" id="Overview">
              <h2 className="split2">OVERVIEW</h2>
              <div
                className="overview-text"
                dangerouslySetInnerHTML={{ __html: project.About_Content }}
              ></div>
            </div>

            {/* HIGHLIGHTS */}
            <div className="discibe pb-5" id="Highlight">
              <h2 className="ameneties-title split2">Highlights</h2>

              <p className="mt-3">{project.Highlights}</p>

              <div className="ul-ameneties mt-4">
                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">Property Type</div>
                    <div className="value">{project.project_type}</div>
                  </span>
                </span>

                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">Price</div>
                    <div className="value">{project.Price}</div>
                  </span>
                </span>

                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">Size</div>
                    <div className="value">{project.Size}</div>
                  </span>
                </span>

                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">RERA No.</div>
                    <div className="value">{project.RERA_No || "N/A"}</div>
                  </span>
                </span>
              </div>
            </div>

            {/* FEATURES & AMENITIES */}
            <div className="ameneties" id="Ameneties">
              <h2 className="ameneties-title split2">Features & Amenities</h2>

              <div className="ul-ameneties">
                {project.Amenities?.length > 0 ? (
                  project.Amenities.map((item, index) => (
                    <span className="features" key={index}>
                      <span className="icon">
                        <img src="/air-conditioning.png" width="34" />
                      </span>
                      <span className="txt"> {item}</span>
                    </span>
                  ))
                ) : (
                  <p>No amenities available</p>
                )}
              </div>
            </div>

            {/* FLOOR PLANS */}
            <div id="Floorplan">
              <FloorPlan plans={project.floor_plans} />
            </div>
          </div>
          {/* ================== CONTACT FORM ================== */}
          <div className="col-sm-4 contactform">
            <div className="formcol formRadius">
              <p className="formtagline text-center">
                {" "}
                <span className="text-gradient2 fs-4 fw-bold">
                  Submit Your Details
                </span>
                <br /> We’ll Contact You Within 24 Hours
              </p>
              <form className="pt-4" onSubmit={handleSubmit}>
                <div className="row gy-4">
                  <div className="col-12">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Your phone number"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      name="city"
                      placeholder="Your City"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "6px",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="terms"
                        required
                        style={{ marginTop: "4px", width: "auto" }}
                      />
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#ffffffff",
                          margin: 0,
                          lineHeight: "14px",
                        }}
                      >
                        I authorize company representatives to Call, SMS, Email
                        or WhatsApp me about its products and offers. This
                        consent overrides any registration for DNC/NDNC.
                      </p>
                    </label>
                  </div>

                  <div className="col-12 text-center">
                    <button type="submit" className="animated-btn">
                      Submit <FaTelegramPlane />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* location advantage */}
      {/* LOCATION */}
      <div className="projectLocation">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="location " id="Location">
                <div className="locationMap text-drop__img-box mt-3">
                  <iframe
                    src={
                      project.Map_Link ||
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.980683027153!2d77.38062529999999!3d28.510228899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce900468ba7fd%3A0x84d67f24f2380e07!2sTOWER%20B-163%2C%2016TH%20FLOOR%20ATS%20BOUQUET!5e0!3m2!1sen!2sin!4v1763974927344!5m2!1sen!2sin"
                    }
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Project Location"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-sm-6  d-flex align-content-center flex-column">
              <div className="locationContent">
                 <h2 className="mainFont">
                Location <span className="text-gradient2">Advantage.</span>
              </h2>
                 <p>{project.Location_Content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* developer content */}
      <div className="developerContent py-5" id="Developer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 d-flex justify-content-center align-content-center flex-column">
              <h2 className="mainFont">
                About <span className="text-gradient2">Developer.</span>
              </h2>
              <p>{project.Abt_builder}</p>
            </div>
            <div className="col-sm-6">
              <img src="/public/contact2.jpg" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <ContactBtn project={project} />
    </>
  );
};

export default ProjectDetailPage;
