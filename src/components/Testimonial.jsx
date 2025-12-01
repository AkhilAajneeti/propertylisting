import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { getTestimonials } from "../api/testimonialApi";
import Loader from "./Loader";
import { FaStar, FaRegStar } from "react-icons/fa";

const Testimonial = () => {
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
  if (loading) return <Loader />;
  return (
    <section className="googleReview py-0 py-md-4">
      <div className="container my-3 pb-5">
        <div className="py-4 py-md-2 text-center">
          <h2 className="fw-bold mainFont">Testimonials</h2>
          <p className="text-center mainFont-2">
            Success isn’t ours until it's yours
          </p>
        </div>

         <div className=" d-flex flex-column align-items-center justify-content-center testimonial">
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
                  slidesPerView: 3, // 👈 desktop
                },
              }} className="mySwiper-2 py-3" >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="card shadow-sm border-1 p-4 rounded-3"
                    style={{ borderColor: "#e94b35" }}
                  >
                    {/* Rating Dynamic */}
                    <div className="mb-2 text-warning">
                      {[...Array(5)].map((_, i) =>
                        i < item.rating ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        )
                      )}
                    </div>

                    {/* Review Dynamic */}
                    <p className="fst-italic text-secondary fw-semibold">
                      “{item.content}”
                    </p>

                    {/* Profile Section Dynamic */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image || "/client-1.png"}
                          alt={item.name}
                          className="rounded-circle me-3"
                          width="70"
                          height="70"
                        />
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">
                            {item.name}
                          </h6>
                          <small className="text-muted">
                            {item.designation}
                          </small>
                        </div>
                      </div>

                      {/* Quote Icon */}
                      <img
                        width="50"
                        height="50"
                        src="/straight-quotes.png"
                        alt="clientImg"
                      />
                    </div>
                  </div>
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
    </section>
  );
};

export default Testimonial;
