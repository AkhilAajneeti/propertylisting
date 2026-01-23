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
    return () => AOS.refreshHard();
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
          delay: i * 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    });
    // 👇 New fade-out animation after 10 sec
    gsap.to(".remove", {
      opacity: 0,
      duration: 1,
      delay: 5,
      ease: "power2.out",
    });
  }, []);
  return (
    <div>
      <div>
        <div
          className=" position-relative"
          style={{ height: "100%", width: "100vw" }}
        >
          <video
            className="object-fit-cover videoSize"
            autoPlay
            loop
            muted
            src="/video.mp4"
          ></video>
        </div>
        <div
          className=" whoweare position-absolute start-50 translate-middle text-white text-center"
          style={{ top: "40%" }}
        >
          <h1 className="fw-bold split2 remove">WHO WE ARE</h1>
        </div>
      </div>
      {/* our story */}
      <div className="container py-5 belowVideo">
        <p className="split2 textjustify">
          At Jenika Ventures, we are not just any real estate consulting firm.
          We are your growth partners. When you are a developer, a channel
          partner, a broker, a buyer, or an investor, we offer you the most
          tailored real estate services across residential, commercial and
          mixed-use segments. Abhishek Raj, our founder, has a unique vision of
          offering specialised services for different segments, including niche
          ones like luxury properties and NRI real estate advisory
          services.{" "}
        </p>
      </div>
      <div className="container ourStorySection">
        <div className="row">
          <div className="col-12 col-md-6 ourStory position-relative overflow-hidden">
            <img
              src="/ourTeam/boss1.png"
              alt=""
              className="img-fluid object-fit-cover"
              style={{ height: "100%" }}
              data-aos="fade-right"
              data-aos-duration="4000"
            />
            <div className="overImg position-absolute moveXY">
              <img src="/about-one-dots.png" alt="whoweare" />
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
              Founded in 2020 and fully operational since 2021, Jenika Ventures
              has one purpose - to establish trust, transparency, and innovation
              in India’s real estate consulting space. We want to simplify the
              experience of buying and selling real estate for our clients - and
              we do it by offering them the right information, honest guidance
              and future-ready solutions.
            </p>
            <p>
              Mr. Abhishek Raj, CEO of Jenika Ventures, has always focused on
              building trusted partnerships and offering long-term value to the
              clients. His customer-first approach and smart solutions gave our
              company ₹100 crore in sales right in the first year.
            </p>
            <p>
              Under his leadership, we have developed strong partnerships with
              industry leaders like Godrej, DLF, Tata and Lodha - giving our
              clients access to the best residential and commercial
              opportunities across India. Due to strategic insights our experts
              offer, we have successfully expanded our digital footprints to key
              real estate markets all over India, including Delhi-NCR, Mumbai,
              Bengaluru, Pune, Hyderabad, and Goa.
            </p>
            <p>
              Today, Jenika Ventures operates across all property
              segments—residential, commercial, mixed-use developments, and
              luxury markets—while upholding the same promises of trust that
              makes you feel safe, transparency you can verify, and innovation
              you can benefit from.
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
            At Jenika Ventures, our mission is to transform real estate
            consulting by offering smart solutions that combine market
            expertise, transparency and technology, and long-term value to our
            clients.
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
                    Trusted presence across 19+ cities in India and Dubai, UAE
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
                    A strong team of 2,200 experienced professionals
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
                    <a href="service-details.html">Innovative Solutions</a>
                  </h3>
                  <p className="colorWhite">
                    Creative and smart real estate advisory system
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
                    <a href="service-details.html">Developer Partnerships</a>
                  </h3>
                  <p className="colorWhite">
                    Partnership with 350+ developers to deliver world-class
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
