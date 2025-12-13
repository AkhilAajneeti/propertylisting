import { React, useEffect } from "react";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Testimonial from "../components/Testimonial";

gsap.registerPlugin(ScrollTrigger);
const ClientTestimonials = () => {
  useEffect(() => {
    // --- TEXT ANIMATION ---
    gsap.utils.toArray(".text-drop__line").forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1, // slight stagger
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1200, // default duration
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <div className="ClientTestimonial"></div>

      {/* ClientTestimonials */}

      <Testimonial bgColor="white" />
    </div>
  );
};

export default ClientTestimonials;
