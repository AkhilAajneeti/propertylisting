import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Services() {
  return (
    <>
      <div className="container Service">
        <h2 className="fw-bold pt-5 mainFont">Services</h2>
        <p>We create innovative strategies to enable transformative growth</p>
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
          className="mySwiper-2"
        >
          <SwiperSlide>
            <div
              className="card style-2"
              style={{
                height: "450px",
                backgroundColor: "#f9e8fb",
                backgroundSize: "cover",
              }}
            >
              <div className="content p-3">
                <h2>Residential</h2>
                <p className="para-1">
                  Validating project market fit in real estate
                </p>
                <div className="insideContent d-flex gap-4">
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                </div>
              </div>
              <div className="content-2 p-3">
                <h4>Learn More</h4>
              </div>
              <div className="cardBG">
                <img src="/1st.svg" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="card style-2"
              style={{
                height: "450px",
                backgroundColor: "#def9e9",
                backgroundSize: "cover",
              }}
            >
              <div className="content p-3">
                <h2>Residential</h2>
                <p className="para-1">
                  Validating project market fit in real estate
                </p>
                <div className="insideContent d-flex gap-4">
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                </div>
              </div>
              <div className="content-2 p-3">
                <h4>Learn More</h4>
                <p>Validating project market fit in real estate</p>
              </div>
              <div className="cardBG">
                <img src="/2nd.svg" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="card style-2"
              style={{
                height: "450px",
                backgroundColor: "#fef1e1",
                backgroundSize: "cover",
              }}
            >
              <div className="content p-3">
                <h2>Residential</h2>
                <p className="para-1">
                  Validating project market fit in real estate
                </p>
                <div className="insideContent d-flex gap-4">
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                </div>
              </div>
              <div className="content-2 p-3">
                <h4>Learn More</h4>
                <p>Validating project market fit in real estate</p>
              </div>
              <div className="cardBG">
                <img src="/3rd.svg" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="card style-2"
              style={{
                height: "450px",
                backgroundColor: "#e2f5fe",
                backgroundSize: "cover",
              }}
            >
              <div className="content p-3">
                <h2>Residential</h2>
                <p className="para-1">
                  Validating project market fit in real estate
                </p>
                <div className="insideContent d-flex gap-4">
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                  <div className="sec-1">
                    <span>600+</span>
                    <p>project executed</p>
                  </div>
                </div>
              </div>
              <div className="content-2 p-3">
                <h4>Learn More</h4>
                <p>Validating project market fit in real estate</p>
              </div>
              <div className="cardBG">
                <img src="/4rth.svg" alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
