import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
const Testimonial = () => {
  return (
    <section className="googleReview py-0 py-md-4">
      <div className="container my-3 pb-5">
        <div className="py-4 py-md-2 text-center ">
          <h2 className="fw-bold mainFont">Testimonials</h2>
          <p className="text-center mainFont-2">
            Success isn’t our untils its yours
          </p>
        </div>
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000} // 👈 transition speed in ms (higher = smoother)
          loop={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1, // 👈 mobile (default)
            },
            768: {
              slidesPerView: 2, // 👈 tablets
            },
            1024: {
              slidesPerView: 3, // 👈 desktop
            },
          }}
          className="mySwiper-2"
        >
          <SwiperSlide>
            <div class="testimonial-wrapper googleReviewslider testimonial-style-2">
              <div class="testimonial-quote">
                <img class="img-fluid" src="/straight-quotes.png" alt="" />
              </div>
              <div class="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem minus sapiente ab rem corrupti numquam aperiam,
                  impedit possimus, culpa debitis ipsam omnis? Natus, fuga aut!
                  ipsam omnis? Natus, fuga aut!
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-image">
                  <img class="img-fluid" src="/02.png" alt="" />
                </div>
                <div class="author-info">
                  <h6 class="author-name">Rohit Mehta</h6>
                  <span class="author-position">Guest</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="testimonial-wrapper googleReviewslider testimonial-style-2">
              <div class="testimonial-quote">
                <img class="img-fluid" src="/straight-quotes.png" alt="" />
              </div>
              <div class="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem minus sapiente ab rem corrupti numquam aperiam,
                  impedit possimus, culpa debitis ipsam omnis? Natus, fuga aut!
                  ipsam omnis? Natus, fuga aut!
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-image">
                  <img class="img-fluid" src="/02.png" alt="" />
                </div>
                <div class="author-info">
                  <h6 class="author-name">Rohit Mehta</h6>
                  <span class="author-position">Guest</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="testimonial-wrapper googleReviewslider testimonial-style-2">
              <div class="testimonial-quote">
                <img class="img-fluid" src="/straight-quotes.png" alt="" />
              </div>
              <div class="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem minus sapiente ab rem corrupti numquam aperiam,
                  impedit possimus, culpa debitis ipsam omnis? Natus, fuga aut!
                  ipsam omnis? Natus, fuga aut!
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-image">
                  <img class="img-fluid" src="/02.png" alt="" />
                </div>
                <div class="author-info">
                  <h6 class="author-name">Rohit Mehta</h6>
                  <span class="author-position">Guest</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div class="testimonial-wrapper googleReviewslider testimonial-style-2">
              <div class="testimonial-quote">
                <img class="img-fluid" src="/straight-quotes.png" alt="" />
              </div>
              <div class="testimonial-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem minus sapiente ab rem corrupti numquam aperiam,
                  impedit possimus, culpa debitis ipsam omnis? Natus, fuga aut!
                  ipsam omnis? Natus, fuga aut!
                </p>
              </div>
              <div class="testimonial-author">
                <div class="author-image">
                  <img class="img-fluid" src="/02.png" alt="" />
                </div>
                <div class="author-info">
                  <h6 class="author-name">Rohit Mehta</h6>
                  <span class="author-position">Guest</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
