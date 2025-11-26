import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import slide_image_1 from "/acp-new.png";
import slide_image_2 from "/acp-new.png";
import slide_image_3 from "/acp-new.png";
import slide_image_4 from "/acp-new.png";
import slide_image_5 from "/acp-new.png";

function ImageSlider() {
  return (
    <section
      style={{ background: "url(/tech-banner.webp)", position: "relative" }}
    >
      <div className="container">
        <div className="row justify-content-center pt-2">
          <div className="col-12 col-sm-8 col-md-10 col-lg-6  text-light d-flex justify-content-center  flex-column align-items-center">
            <h1 className="heading">
              Technology is at the core of everything we do
            </h1>
            <div class="tg-button-wrap">
              <a class="btn-with-icon" href="about.html">
                <span className="btn btn-five">
                  Collaborate with us
                  <img src="arrow (2).png" alt="" height={"30px"} />
                </span>
              </a>
            </div>
          </div>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          speed={800}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ el: ".flower-swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".flower-swiper-button-next",
            prevEl: ".flower-swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="flower-swiper-container"
        >
          <SwiperSlide>
            <img src={slide_image_1} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_2} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_3} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_4} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_5} alt="slide_image" />
          </SwiperSlide>

          <div className="flower-slider-controler" style={{display:"hidden"}}>
            <div className="flower-swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="flower-swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="flower-swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
      <div style={{ position: "absolute", bottom: "0px" }}>
        <img src="/public/wave-bg.png" alt="" className="img-fluid"/>
      </div>
    </section>
  );
}

export default ImageSlider;
