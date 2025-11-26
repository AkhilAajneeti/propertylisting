import React, { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

import PathsTimeline from "../components/PathsTimeline";
const Whoweare = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // default duration
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    //
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
    window.addEventListener("resize", handleResize);
    //
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
    <div>
      <div>
        <div
          className="object-fit-cover position-relative"
          style={{ height: "550px", width: "100vw" }}
        >
          <video
            className="object-fit-cover"
            style={{
              height: "550px",
              width: "100vw",
              filter: "brightness(0.6)",
            }}
            autoPlay
            loop
            muted
            src="/video.mp4"
          ></video>
        </div>
        <div className=" whoweare position-absolute top-50 start-50 translate-middle text-white text-center">
          <h1 className="fw-bold split2 ">WHO WE ARE</h1>
        </div>
      </div>
      {/* our story */}
      <div className="container py-5 belowVideo">
        <p className="split">
          Jenika Ventures is not just a consulting firm—it’s a growth partner
          for clients and developers alike, operating across residential,
          commercial, luxury and mixed-use segments.With Abhishek Raj at the
          helm, our journey continues to be defined by bold goals,
          customer-centricity and an unshakable commitment to shaping the future
          of Indian real estate.{" "}
        </p>
      </div>
      <div className="container ourStorySection">
        <div className="row">
          <div className="col-12 col-md-6 ourStory position-relative">
            <img
              src="/ourTeam/boss1.png"
              alt=""
              className="img-fluid object-fit-cover"
              style={{ height: "100%" }}
              data-aos="fade-right"
              data-aos-duration="4000"
            />
            <div className="overImg position-absolute moveXY">
              <img src="/about-one-dots.png" alt="" />
            </div>
          </div>
          <div className="col-12 col-md-6 ourStory">
            <h1
              className="text-center"
              data-aos="fade-in"
              data-aos-duration="4000"
            >
              Our Story
            </h1>
            <p>
              Founded in 2020, Jenika Ventures was born out of a vision to bring
              trust, transparency and innovation into India’s real estate
              consulting space.
            </p>
            <p>
              What started as a bold idea turned into an operational reality in
              2021, and within just a few years, we have grown into one of
              India’s fastest-emerging real estate consulting firms. The driving
              force behind this growth has been Mr. Abhishek Raj, CEO of Jenika
              Ventures. With a forward-looking vision and a customer-first
              philosophy, he has steered the company from a promising start-up
              to a trusted national consultancy. His belief that real estate
              consulting should go beyond transactions to deliver solutions,
              partnerships and long-term value has been the foundation of our
              culture. Under his leadership, Jenika Ventures forged strong
              alliances with India’s leading developers like DLF, Tata, Godrej
              and Lodha achieving ₹100 crore in sales in our very first year. By
              combining strategic insights with digital-first solutions,
              Abhishek Raj has played a pivotal role in driving our rapid
              expansion into key markets including Delhi-NCR, Mumbai, Pune,
              Bengaluru, Hyderabad and Goa. Today, Jenika Ventures is not just a
              consulting firm—it’s a growth partner for clients and developers
              alike, operating across residential, commercial, luxury and
              mixed-use segments. With Abhishek Raj at the helm, our journey
              continues to be defined by bold goals, customer-centricity and an
              unshakable commitment to shaping the future of Indian real estate.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-brown mb-5">
        <div className="container py-5 belowVideo">
          <h1
            className="text-gradient "
            data-aos="fade-up"
            data-aos-duration="4000"
          >
            Our Mission
          </h1>
          <p
            className="split"
            style={{ color: "white", fontSize: "25px", fontWeight: "500" }}
          >
            Transforming real estateby combining expertise, innovation,and
            technology to create smarter solutions for tomorrow.
          </p>
          <div className="row g-0">
            <div
              className=" col-12 col-md-3"
              data-aos="fade-down"
              data-aos-duration="4000"
              data-aos-delay="50"
            >
              <div className="service-box-items">
                {/* Icon Section */}
                <div className="icon text-md-start text-center">
                  <img src="/one.png" alt="icon" height={"40px"} />
                </div>

                {/* Content Section */}
                <div className="content">
                  <h3>
                    <a href="service-details.html">Global Reach</a>
                  </h3>
                  <p className="colorWhite">
                    Trusted presence across 19+ cities in India & Global Markets
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" col-12 col-md-3"
              data-aos="fade-down"
              data-aos-duration="4000"
              data-aos-delay="100"
            >
              <div className="service-box-items">
                {/* Icon Section */}
                <div className="icon text-md-start text-center">
                  <img src="/two.png" alt="icon" height={"40px"} />
                </div>

                {/* Content Section */}
                <div className="content">
                  <h3>
                    <a href="service-details.html">Expert Team</a>
                  </h3>
                  <p className="colorWhite">
                    Driven by 2,200+ Professionals of Excellence
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" col-12 col-md-3"
              data-aos="fade-down"
              data-aos-duration="4000"
              data-aos-delay="130"
            >
              <div className="service-box-items">
                {/* Icon Section */}
                <div className="icon text-md-start text-center">
                  <img src="/three.png" alt="icon" height={"40px"} />
                </div>

                {/* Content Section */}
                <div className="content">
                  <h3>
                    <a href="service-details.html">Innovation First</a>
                  </h3>
                  <p className="colorWhite">
                    Pioneering real estate solutions through creativity &
                    technology
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" col-12 col-md-3"
              data-aos="fade-down"
              data-aos-duration="4000"
              data-aos-delay="160"
            >
              <div className="service-box-items">
                {/* Icon Section */}
                <div className="icon text-md-start text-center">
                  <img src="/four.png" alt="icon" height={"40px"} />
                </div>

                {/* Content Section */}
                <div className="content">
                  <h3>
                    <a href="service-details.html">Developers Relationship</a>
                  </h3>
                  <p className="colorWhite">
                    Partnering with top 350+ developers to deliver world-class
                    projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PathsTimeline />
    </div>
  );
};

export default Whoweare;
