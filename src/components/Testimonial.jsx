import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const Testimonial = () => {
  const api = import.meta.env.VITE_BACKEND_API;
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${api}/testimonials`);
        setTestimonials(res.data.results || []);
      } catch (error) {
        console.log("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [api]);

  return (
    <section className="googleReview py-0 py-md-4">
      <div className="container my-3 pb-5">
        <div className="py-4 py-md-2 text-center">
          <h2 className="fw-bold mainFont">Testimonials</h2>
          <p className="text-center mainFont-2">
            Success isn’t ours until it's yours
          </p>
        </div>

        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper-2"
        >
          {testimonials.length > 0 ? (
            testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonial-wrapper googleReviewslider testimonial-style-2">
                  <div className="testimonial-quote">
                    <img
                      className="img-fluid"
                      src="/straight-quotes.png"
                      alt=""
                    />
                  </div>

                  <div className="testimonial-content">
                    <p>{item.content}</p>
                  </div>

                  <div className="testimonial-author">
                    <div className="author-image">
                      <img
                        className="img-fluid"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="author-info">
                      <h6 className="author-name">{item.name}</h6>
                      <span className="author-position">
                        {item.designation}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center">Loading testimonials...</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
