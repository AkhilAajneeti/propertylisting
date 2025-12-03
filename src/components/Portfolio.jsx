import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
const Portfolio = () => {
  return (
    <section className="pb-4 pb-md-5">
      <div className="container my-2 ">
        <h2 className="fw-bold pt-5 text-center mainFont">Our Developers</h2>
        <p className="text-center">When You Succeed, We Succeed!</p>
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={6}
          spaceBetween={30}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          pagination={{
            clickable: true,
          }}
          speed={4000} // 👈 transition speed in ms (higher = smoother)
          loop={true}
          freeMode={true}
          breakpoints={{
            0: {
              slidesPerView: 2, // 👈 mobile (default)
            },
            768: {
              slidesPerView: 4, // 👈 tablets
            },
            1024: {
              slidesPerView: 6, // 👈 desktop
            },
          }}
          className="mySwiper-2 py-3 portfolio"
        >
          <SwiperSlide>
            <img
              src="/builder/Gaur.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/M3M.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/l&t.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/elan.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/tata.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/godrejLogo.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/ATS-1.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/Bhutani-1.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/lodha.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/DLF.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/prestige.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/Adity.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/max.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/builder/sobha.png"
              alt=""
              className="img-fluid"
              loading="lazy"
              width="424"
              height="217"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;
