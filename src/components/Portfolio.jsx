import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
const Portfolio = () => {
  return (
    <section className="pb-4 pb-md-5">
      <div className="container my-2 ">
        <h2 className="fw-bold pt-5 text-center mainFont">Our Developers</h2>
        <p className="text-center">We only partner with top-tier developers who are fully compliant, have a commendable history of delivering projects on time, and offer value to our clients (both buyers and investors).</p>
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
              alt="developere_Logo"
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
              src="/builder/experion-developers.jpeg"
              alt="developere_Logo"
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
              src="/builder/smartworld-blue-logo.png"
              alt="developere_Logo"
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
              src="/builder/county-group.png"
              alt="developere_Logo"
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
              src="/builder/Eldeco.png"
              alt="developere_Logo"
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
              src="/builder/Omaxe.png"
              alt="developere_Logo"
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
              src="/builder/ace-group-original.png"
              alt="developere_Logo"
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
              src="/builder/signature.jpeg"
              alt="developere_Logo"
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
              src="/builder/EMAAR_WORD_MARK_EN-1.png"
              alt="developere_Logo"
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
              src="/builder/centralpark.png"
              alt="developere_Logo"
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
              src="/builder/shapoolji.jpg"
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
              alt="developere_Logo"
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
