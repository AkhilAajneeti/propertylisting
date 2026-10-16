import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Slider from "../components/Slider";
import RealEstateTabs from "../components/RealEstateTabs";
import Testimonial from "../components/Testimonial";
import Counter from "../components/Counter";
import Portfolio from "../components/Portfolio";
import Whycarousel from "../components/Whycarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/propertySlice";
import SEO from "../components/seo/SEO";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const dispatch = useDispatch();
  const { data: projects, projectsError:error } = useSelector((state) => state.projects);

  // ✅ Fetch data once when component mounts
  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  // ✅ Optional GSAP setup (your scroll effects)
  useEffect(() => {
    if (!projects?.length) return; // ensure data loaded before trigger

    const triggers = [];

    gsap.utils.toArray(".text-drop__line").forEach((line, i) => {
      const trigger = gsap.fromTo(
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
            toggleActions: "play none none reverse",
          },
        },
      );

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [projects]);


  return (
    <div>
      <SEO
        title="Jenika Ventures Private Limited | Buy Luxury & Commercial Property in Delhi NCR"
        description="Explore luxury apartments, commercial properties, office spaces, and retail shops in Noida, Gurgaon, and Delhi NCR. Invest in RERA-approved projects with high returns."
      />
      {/* ================== MARQUEE ================== */}
      <div className="dpa-marquee">
        <div className="dpa-marquee__track">
          <div className="dpa-marquee__item">
            <span className="dpa-marquee__hl">GRAND FESTIVE DAYS coming your way</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">To know more, call</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
          <div className="dpa-marquee__item" aria-hidden="true">
            <span className="dpa-marquee__hl">GRAND FESTIVE DAYS coming your way</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">To know more, call</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
          <div className="dpa-marquee__item" aria-hidden="true">
            <span className="dpa-marquee__hl">GRAND FESTIVE DAYS coming your way</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">To know more, call</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
          <div className="dpa-marquee__item" aria-hidden="true">
            <span className="dpa-marquee__hl">GRAND FESTIVE DAYS coming your way</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">To know more, call</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
        </div>
      </div>
      <div className="dw-banner">
        <img
          className="dw-banner__art"
          src="/GoldenDiwaliFestivalBanner.png"
          alt="The Billionaires Property Festival - Buy 1 Get 1 Free"
        />

        <div className="dw-banner__cta">
          <div className="dw-gift">
            <span className="dw-gift__halo" aria-hidden="true" />
            <img src="/gift.png" alt="" aria-hidden="true" />
          </div>


          {/* Gold rim is a padded wrapper around an inner maroon pill - a
              plain border cannot take a gradient. */}
          <Link to="/billionaires-property-festival" className="dw-reveal">
            <span className="dw-reveal__inner">
              <svg className="dw-reveal__gift" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="10" width="18" height="11" rx="1.5" />
                <rect x="2" y="6.5" width="20" height="4" rx="1" />
                <line x1="12" y1="6.5" x2="12" y2="21" />
                <path d="M12 6.5C12 6.5 10.6 2.5 8 2.5C6.3 2.5 5.6 4.6 7 5.6C8.2 6.4 12 6.5 12 6.5Z" />
                <path d="M12 6.5C12 6.5 13.4 2.5 16 2.5C17.7 2.5 18.4 4.6 17 5.6C15.8 6.4 12 6.5 12 6.5Z" />
              </svg>

              <span className="dw-reveal__text">Reveal Now</span>

              <span className="dw-reveal__chev" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </span>
          </Link>
        </div>

        <span className="dw-banner__tc">T&amp;C Apply</span>
      </div>

      <Slider />
      <Counter />

      {/* Pass projects directly to your RealEstateTabs */}
      {/* <RealEstateTabs projects={projects || []} /> */}
      {/* Pass projects directly to your RealEstateTabs */}
      {error ? (
        <div className="container text-center py-5">
          <p className="text-danger mb-3">Unable to load projects right now.</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => dispatch(fetchProjects())}
          >
            Retry
          </button>
        </div>
      ) : (
        <RealEstateTabs projects={projects || []} />
      )}


      <Portfolio />
      <Testimonial bgColor="linear-gradient(1200deg, #f5e7ad 1.99%, #f5ebac 0.49%, #b49249 100%)" />

      <Whycarousel />



    </div>
  );
};

export default Home;
