import React, { useEffect } from "react";
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

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const dispatch = useDispatch();
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
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
        }
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
      <Slider />
      <Counter />

      {/* Pass projects directly to your RealEstateTabs */}
      <RealEstateTabs projects={projects || []} />

      <Portfolio />
      <Testimonial />

      <Whycarousel />
    </div>
  );
};

export default Home;
