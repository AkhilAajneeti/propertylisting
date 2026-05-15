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
      <Slider />
      <Counter />

      {/* Pass projects directly to your RealEstateTabs */}
      <RealEstateTabs projects={projects || []} />

      <Portfolio />
      <Testimonial bgColor="linear-gradient(1200deg, #f5e7ad 1.99%, #f5ebac 0.49%, #b49249 100%)" />

      <Whycarousel />


      <div className="container">
        <Link to="/client-registration" className="footerImg img-fluid">
          <img
            src="/Doorstep%20Property%20Access.jpg.jpeg"
            alt="Doorstep Property Access — Register with Jenika Ventures"
            style={{ height: "100%", width: "100%", borderRadius: "50px", padding: "10px 0px" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
