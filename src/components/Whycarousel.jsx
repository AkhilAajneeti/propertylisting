import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
const Whycarousel = () => {
  return (
    <section className=" py-3">
      <div className="container my-3">
        <h2 className="fw-bold pt-0 pt-md-3 text-center mainFont">
          Why Only Jenika Ventures?
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
              <h5>We Show You Best Projects</h5>
              {/* content */}
              <p className="text-center">
                We do not push what’s available. We understand your goals and
                showcase projects with fair pricing, on-ground demand,
                construction quality, exit feasibility, and more. We understand
                real estate market dynamics and only present you with options
                that make most sense for you.{" "}
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
              <h5>We Serve As Your Guide</h5>
              {/* content  */}
              <p className="text-center">
                Each buyer is unique - and we are not ‘sellers’ or ‘brokers’. We
                are your real estate advisors. We understand your purpose and
                recommend you properties according to what you want - living
                near your office, rental potential, capital appreciation, luxury
                lifestyle, or more.
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
              <h5>Support Beyond Site Visits</h5>
              {/* content */}
              <p className="text-center">
                We are not merely here to help you shortlist your property. We
                help you with negotiations, making sure your paperwork is clear,
                possession coordination and all the guidance you need after
                purchasing the property. At Jenika Ventures, we offer you
                end-to-end support.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Whycarousel;
