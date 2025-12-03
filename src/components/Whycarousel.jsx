import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
const Whycarousel = () => {
  return (
    <section className=" py-3">
      <div className="container my-3">
        <h2 className="fw-bold pt-0 pt-md-3 text-center mainFont">
          Why Only Jenika Ventures
        </h2>
        {/* <p className="text-center">When You Succeed, We Succeed!</p> */}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
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
          modules={[Pagination]}
          className="mySwiper-2 py-3"
        >
          <SwiperSlide>
            <div className="WHySection text-center">
              {/* img */}
              <img
                src="/content1.png"
                alt="Trusted Real Estate Advisors"
                width={"100px"}
                height={"100px"}
                loading="lazy"
                decoding="async"
              />
              {/* para */}
              <h5>Why Trust Jenika Venture</h5>
              {/* content */}
              <p>
               Jenika Ventures features almost every top developer brands on PAN India with a broad spectrum of residential and commercial projects covering all budget categories.These words truly express the mission of Jenika Ventures.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="WHySection text-center">
              {/* img */}
              <img
                src="/content2.png"
                alt="Trusted Real Estate Advisors"
                width={"100px"}
                height={"100px"}
                loading="lazy"
                decoding="async"
              />
              {/* para */}
              <h5>Customer Oriented</h5>
              {/* content  */}
              <p>
               Jenika Ventures aspire to spread happiness by turning dreams of owning a sweet home into a real masterpiece of one’s choice with a rigid standard of ultimate Quality, Craftsmanship and Creativity from our exclusive portfolio of various projects.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="WHySection text-center">
              {/* img */}
              <img
                src="/content3.png"
                alt="Trusted Real Estate Advisors"
                width={"100px"}
                height={"100px"}
                loading="lazy"
                decoding="async"
              />
              {/* para */}
              <h5>Tech Ideal</h5>
              {/* content */}
              <p>
                Committed to people, committed to future. We are a young team with enormous love & passion for Real Estate Consulting who dares to think BIG and is not afraid to be different globally. These words truly express the mission of Jenika Ventures.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Whycarousel;
