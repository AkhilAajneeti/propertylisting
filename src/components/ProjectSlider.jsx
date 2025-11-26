import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProjectSlider = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  return (
    <div className="project-slider-wrapper">
      {/* Main Slider */}
      <Swiper
        modules={[Thumbs, Autoplay]}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 3000 }}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Project ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        modules={[Thumbs, Autoplay]}
        onSwiper={setThumbsSwiper}
        spaceBetween={24}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        watchSlidesProgress={true}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 15 },
          480: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          992: { spaceBetween: 16 },
          1200: { spaceBetween: 18 },
          1600: { spaceBetween: 24 },
        }}
        className="thumb-slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Thumb ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectSlider;
