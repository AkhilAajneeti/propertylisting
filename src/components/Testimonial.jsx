import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { getTestimonials } from "../api/testimonialApi";
import Loader from "./Loader";
import { FaStar, FaRegStar } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonial = ({ bgColor }) => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then((data) => setTestimonials(data))
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200, // default duration
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);
  if (loading) return <Loader />;
  return (
    <section className="googleReview py-0 py-md-4" style={{ background: bgColor }}>
      {/*  */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="leftItem p-1 p-sm-3 p-md-5">
              <p
                className="text-gradient fs-4 fw-medium "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img src="/icons8-home.gif" alt="clientImg" className="gif" />
                Client Testimonial
              </p>
              <h2
                className="fs-1 fw-bold text-drop__line"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                Hear From Happy Homeowners
              </h2>
              <p data-aos="fade-up" data-aos-duration="1800">
                Discover what our satisfied homeowners have to say about their
                journey . Real stories, real experiences and real trust - built
                one home at a time.
              </p>
              <div
                className="imageContainer d-flex align-items-center pb-3"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  className="rounded-circle"
                  width="50"
                  height="50"
                  src="/client-1.png"
                  alt="clientImg"
                />
                <img
                  className="rounded-circle"
                  style={{ border: "2px solid #fff", marginLeft: "-15px" }}
                  width="50"
                  height="50"
                  src="/client-2.png"
                  alt="clientImg"
                />
                <img
                  className="rounded-circle"
                  style={{ border: "2px solid #fff", marginLeft: "-15px" }}
                  width="50"
                  height="50"
                  src="/client-3.png"
                  alt="clientImg"
                />
                <p className="ciclecards">10K</p>
              </div>
              <p
                className="fw-medium"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                More Than <span className="text-gradient fs-5">25K</span>{" "}
                Clients Reviews
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center testimonial">
            {/*  */}
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay, Navigation, EffectFade]}
              loop={true}
              pagination={{
                el: ".custom-pagination",
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                },
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1, // 👈 mobile (default)
                },
                768: {
                  slidesPerView: 1, // 👈 tablets
                },
                1024: {
                  slidesPerView: 1, // 👈 desktop
                },
              }}
              className="mySwiper-2 py-3"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <TestimonialCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-controls d-flex justify-content-center align-items-center mt-3">
              <div className="swiper-button-prev"></div>
              <div className="custom-pagination mx-3"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
