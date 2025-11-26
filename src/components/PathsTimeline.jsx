import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import required modules
import { Scrollbar } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".split").forEach((el) => {
        let split = new SplitText(el, {
          type: "words,lines",
          linesClass: "line",
        });

        gsap.from(split.lines, {
          scrollTrigger: {
            trigger: el, // 👈 har element ka trigger usi pe hoga
            start: "top 80%", // jab ~80% viewport me aayega tab chalega
            toggleActions: "play none none none",
          },
          duration: 2,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "expo.out",
        });
      });
    });

    return () => ctx.revert(); // cleanup on unmount
  }, []);
  return (
    <>
      <section className="container pb-5">
        <h1 className="split text-center">Our milestones</h1>
        <p className="split text-center">
          Celebrating the journey that shaped us
        </p>
        <Swiper
          slidesPerView={2} // show 2 slides
          spaceBetween={20}
          grabCursor={true}
          scrollbar={{ draggable: true, hide: false }}
          modules={[Scrollbar]}
          className="TimelineSwiper py-4"
          breakpoints={{
            0: {
              slidesPerView: 1, // 👈 mobile (default)
            },
            768: {
              slidesPerView: 1, // 👈 tablets
            },
            1024: {
              slidesPerView: 2, // 👈 desktop
            },
          }}
        >
          <SwiperSlide>
            <div className="yearItems redgradient text-white p-4 position-relative">
              <h4>2021 -</h4>
              <p className="split">
               Partnered with Grade A+ developers like DLF, Tata, Godrej, and Lodha Group. Achieved ₹100 crore sales in our very first year.
              </p>
              <div className="overImg position-absolute">
                <img src="/counter-one-shape1.png" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="yearItems bg-brown-2 text-white p-4">
              <h4>2022 -</h4>
              <p className="split">
                Spread wings across Delhi-NCR, Mumbai and Pune. Recognized as Outstanding Real Estate Company of the Year 2022.
              </p>
              <div className="overImg position-absolute">
                <img src="/counter-one-shape1.png" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="yearItems greengradient-2 text-white p-4">
              <h4>2023 -</h4>
              <p className="split">
                Deepened collaboration with Lodha Group. Diversified into commercial & mixed-use projects. Surpassed ₹300 crore with 80% YoY growth.
              </p>
              <div className="overImg position-absolute">
                <img src="/counter-one-shape1.png" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="yearItems yellowgradient-2 text-white p-4">
              <h4>2024 -</h4>
              <p className="split">
              Expanded into Goa, Bengaluru & Hyderabad. Hit ₹750 crore in sales with 150% YoY growth, moving closer to becoming a top-tier consultancy nationwide.
              </p>
              <div className="overImg position-absolute">
                <img src="/counter-one-shape1.png" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="yearItems redgradient-2 text-white p-4">
              <h4>2025 -</h4>
              <p className="split">
               Now chasing our boldest target—₹2,000 crore in sales with 2x growth in a single year. Backed by client trust, strategic alliances and our relentless pursuit of excellence.
              </p>
              <div className="overImg position-absolute">
                <img src="/counter-one-shape1.png" alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
