import { React, useEffect } from "react";
import JobSection from "../components/JobSection";
import EmployeeTestimonial from "../components/EmployeeTestimonial";
import CompanyStory from "../components/CompanyStory";
import SplitType from "split-type";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    document.fonts.ready.then(() => {
      const splitItems = document.querySelectorAll(".split2");
      gsap.set(splitItems, { opacity: 1 });

      splitItems.forEach((el) => {
        const split = new SplitType(el, { types: "words" });

        gsap.from(split.words, {
          opacity: 0,
          y: 35,
          duration: 0.9,
          stagger: 0.05,
          ease: "power3.out",
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
      {/* Hero Banner */}
      <div className="CareerBanner" role="img" aria-label="Career Banner"></div>

      {/* Section 2 */}
      <div className="py-5">
        <div className="Careercontent">
          <div className="row gy-5 align-items-center">
            <div className="col-12 col-sm-6">
              <img src="/campass.png" alt="Career at Jenika Ventures" className="img-fluid" loading="lazy"
                decoding="async"/>
            </div>
            <div className="col-12 col-sm-6">
              <p>
                At Jenika Ventures, we know that great ideas come from great
                people.
              </p>
              <p>
                We’re building a progressive workplace that encourages
                innovation.
              </p>
              <p>Every voice matters — because together, we build success.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Career Section */}
      <div className="jobSection">
        <div className="text-center">
          <h1 className="split2">Career Opportunities</h1>
          <p className="split2 text-center">Our Next Chapter Starts Here</p>
        </div>

        <div className="container">
          <JobSection />
        </div>
      </div>

      {/* Testimonial + Gallery */}
      <EmployeeTestimonial />
      <CompanyStory />

      {/* Extra */}
      <div className="extraCareer text-center">
        <h1 className="text-drop__line">Didn’t spot the perfect role yet?</h1>
        <h2 data-aos="fade-up">Reach out to us at</h2>
        <a data-aos="fade-up" href="mailto:careers@jenikaventures.com">
          careers@jenikaventures.com
        </a>
      </div>
    </div>
  );
};

export default Career;
