import { React, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import CareerTesti from "../components/CareerTesti";
import JobSection from "../components/JobSection";
import gsap from "gsap";
import SplitType from "split-type";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Lenis from "@studio-freight/lenis";
import EmployeeTestimonial from "../components/EmployeeTestimonial";
import CompanyStory from "../components/CompanyStory";
gsap.registerPlugin(ScrollTrigger);
const Career = () => {
  useEffect(() => {
    // --- LENIS SMOOTH SCROLL SETUP ---
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      direction: "vertical",
      smoothTouch: true,
    });

    // keep Lenis and ScrollTrigger in sync
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // normalize scroll for GSAP
    ScrollTrigger.normalizeScroll(true);
    // Reset scroll triggers on resize
    const handleResize = () => ScrollTrigger.refresh();
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

    AOS.init({
      duration: 1200, // default duration
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    // Wait for fonts to load before animation
    document.fonts.ready.then(() => {
      gsap.set(".split2", { opacity: 1 });

      const elements = document.querySelectorAll(".split2");

      elements.forEach((el, i) => {
        // Split text into words
        const split = new SplitType(el, { types: "words", tagName: "span" });

        // Animate words
        gsap.from(split.words, {
          opacity: 0,
          y: 40, // slide up
          duration: 1,
          ease: "sine.out",
          stagger: 0.08,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    });
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="CareerBanner"></div>

      {/* section 2 */}
      <div className=" py-5">
        <div className="Careercontent">
          <div className="row gy-5 gy-sm-0">
            <div className="col-12 col-sm-6">
              <img src="/campass.png" alt="" className="img-fluid" />
            </div>
            <div className="col-12 col-sm-6 d-flex flex-column justify-content-center">
              <p>
                At Jenika Ventures, we know that great ideas come from great
                people.
              </p>
              <p>
                We’re building a diverse and progressive workplace that
                celebrates collaboration, innovation, and growth.
              </p>
              <p>
                Every voice matters here — because together, we build more than
                just properties; we build trust, success, and lasting impact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* career section */}
      <div className="jobSection">
        <div className=" text-center first">
          <h1 className="split2">Career Opportunities</h1>
          <p className="split2 text-center">Our Next Chapter Starts Here</p>
        </div>
        <div className="container">
          <JobSection />
        </div>
      </div>
      {/* career section */}

      {/* employeeTestimonial */}
      <EmployeeTestimonial />
      {/* story section */}

      <CompanyStory />
      {/* extra's */}
      <div className="extraCareer">
        <h1 className="text-drop__line">Didn’t spot the perfect role yet?</h1>
        <h2 data-aos="fade-up" data-aos-duration="6000">
          Reach out to us at
        </h2>
        <a
          data-aos="fade-up"
          data-aos-duration="8000"
          href="careers@jenikaventures.com"
        >
          careers@jenikaventures.com
        </a>
      </div>
    </div>
  );
};

export default Career;
