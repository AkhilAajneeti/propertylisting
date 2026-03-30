import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
import { useNavigate, useParams } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import ProjectSlider from "../components/ProjectSlider";
import FloorPlan from "../components/FloorPlan";
import DetailPageNavbar from "../components/DetailPageNavbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import ContactBtn from "../components/ContactBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../redux/slices/propertySlice";
import { submitProjectEnquiry } from "../api/projectFormApi";
import Brochure from "../components/Brochure";
import BrochurePopup from "../components/brochureModel/BrochurePopup";
import SEO from "../components/seo/SEO";
const ProjectDetailPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentProject: project,
    loading,
    error,
  } = useSelector((state) => state.projects);
  // Fetch project
  // Fetch project using Redux
  useEffect(() => {
    dispatch(fetchProjectById({ id }));
  }, [id, dispatch]);

  //pixel code
  useEffect(() => {
    if (!project?.pixel_code) return;

    const pixelId = project.pixel_code;

    // --- Create Script for fbq ---
    const script = document.createElement("script");
    script.innerHTML = `
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){ n.callMethod ?
      n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e); t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
    script.type = "text/javascript";
    document.head.appendChild(script);

    // --- noscript fallback ---
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>
  `;
    document.body.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(noscript);
    };
  }, [project]);

  // Animations
  useEffect(() => {
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
        },
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
        },
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
    document.fonts.ready.then(() => {
      gsap.set(".split2", { opacity: 1 });
      const elements = document.querySelectorAll(".split2");

      elements.forEach((el) => {
        const split = new SplitType(el, { types: "words" });

        gsap.from(split.words, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "sine.out",
          stagger: 0.2,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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
      },
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

  const handleSubmit = async (e, isPopup = false) => {
    if (e) e.preventDefault();

    try {
      await submitProjectEnquiry(id, form);

      toast.success("Thank you! Redirecting...");
      // ✅ popup close if popup form
      if (isPopup) {
        setShowPopup(false);
      }
      setTimeout(() => {
        navigate("/thankyou");
      }, 1000); // small delay for toast visibility
    } catch (error) {
      console.error("Enquiry Submit Error:", error);
      toast.error("Something went wrong. Try again!");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!project) return null;
  const locationPoints = project?.Location_Content?.split(/\r?\n/) // split on new lines
    .map((item) => item.trim())
    .filter(Boolean); // remove empty lines
  const highlightPoints = project?.Highlights?.split(/\r?\n|,/) // newline OR comma dono handle
    .map((item) => item.trim())
    .filter(Boolean);

  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .ls {  padding: 45px 24px; font-family: 'DM Sans', sans-serif; }
  .ls-inner { width: 100%; margin: 14px auto; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .ls-eyebrow { font-size: 10px; font-weight: 500; letter-spacing: 5px; text-transform: uppercase; color: #b89a50; margin-bottom: 12px; }
  .ls-heading { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 400; color: #fff; line-height: 1.25; }
  .ls-heading em { font-style: italic; color: #c9a84c; }
  .ls-rule { width: 70px; height: 1px; background: #c9a84c; margin: auto; opacity: .6; }

  .map-shell { position: relative; border-radius: 10px; overflow: hidden; }
  .map-shell::before { content: ''; position: absolute; inset: 0; border: 1px solid rgba(201,168,76,.2); z-index: 2; pointer-events: none; border-radius: 2px; }
  .map-shell iframe { width: 100%; height: 380px; display: block; filter: saturate(.6) brightness(.8) contrast(1.05); }
  .map-tag { position: absolute; bottom: 14px; left: 14px; z-index: 3; display: flex; align-items: center; gap: 8px; background: rgba(11,11,22,.88); border: 1px solid rgba(201,168,76,.25); padding: 8px 14px; border-radius: 2px; }
  .map-dot { width: 7px; height: 7px; border-radius: 50%; background: #c9a84c; box-shadow: 0 0 6px #c9a84c; animation: blink 2s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
  .map-tag-txt { font-size: 10px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #d4b870; }

  .loc-cards { display: flex; flex-direction: column; gap: 10px; }
  .loc-card { display: flex; align-items: center; background: #f5f0e6; border-radius: 4px; overflow: hidden; cursor: default; transition: transform .25s, box-shadow .25s; }
  .loc-card:hover { transform: translateX(4px); box-shadow: -3px 0 0 #c9a84c; }
  .loc-num {margin: 6px;height: 55px;border-radius: 8px; background: #111; color: #fff; font-size: 13px; font-weight: 500; letter-spacing: 1px; min-width: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .loc-label { padding: 10px; font-size: 14px; font-weight: 400; color: #1a1a2e; flex: 1; }

  @media(max-width:640px){ .ls-inner { grid-template-columns: 1fr; } }
`;
  return (
    <>
      <SEO
        title={`${project.Title} | ${project.Project_Location} - Price, Floor Plan & Details`}
        description={`${project.Title} located in ${project.Project_Location}. Explore ${project.project_type} with price starting from ${project.Price}. Get floor plans, amenities, and complete project details.`}
      />
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
        <div className="banner-content position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="split2">{project.category}</h1>
        </div>
        <div className="overlay"></div>
      </div>

      <div className="detail-sticky-nav">
        <DetailPageNavbar project={project} />
      </div>

      {/* ================== MAIN CONTENT ================== */}
      <div className="container py-5 projectDetail">
        <div className="row">
          <div className="col-12 pb-2">
            <h1 className="projectText">{project.Title}</h1>
            <h5 className="text-drop__line split2 text-start">
              {project.Project_Location}
            </h5>
          </div>
          <div className="col-sm-8">
            {/* SLIDER */}
            <ProjectSlider
              images={[
                project.Bann1,
                project.Bann2,
                project.Bann3,
                ...(project.gallery_images?.map((img) => img.image) || []),
              ]}
            />
            {/* HIGHLIGHTS */}
            <div className="discibe py-5" id="Highlight">
              <h2 className="ameneties-title split2">Highlights</h2>

              <ul className="highlightList">
                {highlightPoints?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="ul-ameneties mt-4">
                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">Property Type</div>
                    <div className="value hilights-Value">
                      {project.project_type}
                    </div>
                  </span>
                </span>

                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">Price</div>
                    <div className="value hilights-Value">{project.Price}</div>
                  </span>
                </span>

                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">Size</div>
                    <div className="value hilights-Value">{project.Size}</div>
                  </span>
                </span>

                <span className="features d-flex gap-3">
                  <span className="txt">
                    <div className="key">RERA No.</div>
                    <div className="value hilights-Value">
                      {project.RERA_No || "N/A"}
                    </div>
                  </span>
                </span>
              </div>
            </div>

            {/* OVERVIEW */}
            <div className="overview py-5" id="Overview">
              <h2 className="split2">Project Information</h2>
              <div
                className="overview-text twoLineClamp"
                dangerouslySetInnerHTML={{ __html: project.About_Content }}
              ></div>
            </div>

            {/* FEATURES & AMENITIES */}
            <div className="ameneties" id="Amenities">
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
              <FloorPlan
                plans={project.floor_plans}
                setShowPopup={setShowPopup}
              />
            </div>

            {/* brochure */}
            <Brochure project={project} onOpen={() => setShowPopup(true)} />
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
                      pattern="^\d{10}$" inputmode="numeric" maxlength="10"
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

      <style>{styles}</style>
      <div className="parentCard" style={{ background: "rgb(0 0 0)" }}>
        <div className="container">
          <section className="ls" id="Location">
            <div className="text-center">
              <p className="ls-eyebrow text-center">Location Advantage</p>
              <div className="ls-rule" />
              <h2 className="ls-heading">
                The Only Place You'll Find <em>Outside</em>
                <br />
                The Home
              </h2>
            </div>

            <div className="ls-inner">
              {/* MAP */}
              <div>
                <div className="map-shell">
                  <iframe
                    src={
                      project.Map_Link ||
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.980683027153!2d77.38062529999999!3d28.510228899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce900468ba7fd%3A0x84d67f24f2380e07!2sTOWER%20B-163%2C%2016TH%20FLOOR%20ATS%20BOUQUET!5e0!3m2!1sen!2sin!4v1763974927344!5m2!1sen!2sin"
                    }
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Project Location"
                    style={{ border: 0, width: "100%", height: "450px" }}
                  />
                </div>
              </div>

              {/* LOCATION CARDS */}
              <div>
                <div className="loc-cards">
                  {locationPoints?.length > 0 ? (
                    locationPoints.map((item, index) => (
                      <div className="loc-card" key={index}>
                        <div className="loc-num">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="loc-label">{item}</div>
                      </div>
                    ))
                  ) : (
                    <div className="loc-card">
                      <div className="loc-num">01</div>
                      <div className="loc-label">
                        No location advantages available
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* developer content */}
      <div className="aboutContent py-5" id="Developer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 d-flex justify-content-center align-content-center flex-column">
              <h2 className="mainFont">
                <span className="text-gradient2">OVERVIEW</span>
              </h2>
              <div
                className="overview-text"
                dangerouslySetInnerHTML={{ __html: project.About_Content }}
              ></div>
            </div>

            <div className="col-sm-6">
              <img src={project.Bann1} alt="Jenikaimg" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* developer content */}
      <div className="developerContent py-5" id="Developer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <img src="/contact2.jpg" alt="Jenikaimg" className="img-fluid" />
            </div>

            <div className="col-sm-6 d-flex justify-content-center align-content-center flex-column">
              <h2 className="mainFont">
                About <span className="text-gradient2">Developer</span>
              </h2>
              <p>{project.Abt_builder}</p>
            </div>
          </div>
        </div>
      </div>
      <ContactBtn project={project} />

      {showPopup && (
        <BrochurePopup
          onClose={() => setShowPopup(false)}
          onSubmit={(data) => submitProjectEnquiry(id, data)}
        />
      )}
    </>
  );
};

export default ProjectDetailPage;
