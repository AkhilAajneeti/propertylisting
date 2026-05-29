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
  const { data: projects, error } = useSelector((state) => state.projects);

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

  if (error) return <p>Error loading projects: {error}</p>;

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
            <span className="dpa-marquee__hl">“Real Estate ki Home Delivery”</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">Call now to book your Doorstep Access</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
          <div className="dpa-marquee__item" aria-hidden="true">
            <span className="dpa-marquee__hl">“Real Estate ki Home Delivery”</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">Call now to book your Doorstep Access</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
          <div className="dpa-marquee__item" aria-hidden="true">
            <span className="dpa-marquee__hl">“Real Estate ki Home Delivery”</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">Call now to book your Doorstep Access</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
          <div className="dpa-marquee__item" aria-hidden="true">
            <span className="dpa-marquee__hl">“Real Estate ki Home Delivery”</span>
            <span className="dpa-marquee__sep">✦</span>
            <span className="dpa-marquee__cta">Call now to book your Doorstep Access</span>
            <span className="dpa-marquee__phone">📞 6390509090</span>
          </div>
        </div>
      </div>
      <div>
        <Link to="/doorstep-property-access" className="footerImg img-fluid">
          <img
            src="/Doorstep%20Property%20Access.jpg.jpeg"
            alt="Doorstep Property Access — Register with Jenika Ventures"
            style={{ height: "100%", width: "100%" }}
          />
        </Link>
      </div>
      <Slider />
      <Counter />

      {/* Pass projects directly to your RealEstateTabs */}
      <RealEstateTabs projects={projects || []} />

      <Portfolio />
      <Testimonial bgColor="linear-gradient(1200deg, #f5e7ad 1.99%, #f5ebac 0.49%, #b49249 100%)" />

      <Whycarousel />



    </div>
  );
};

export default Home;
