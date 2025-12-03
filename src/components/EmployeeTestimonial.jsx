import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import CareerTesti from "../components/CareerTesti";
import { useDispatch, useSelector } from "react-redux";
import { fetchCareerTestimonials } from "../redux/slices/careerTestimonialsSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EmployeeTestimonial = () => {
  const dispatch = useDispatch();
  const {
    data: testimonials,
    loading,
    error,
  } = useSelector((state) => state.careerTestimonials);

  useEffect(() => {
    dispatch(fetchCareerTestimonials());

    return () => {
      const autoplay = document.querySelector(".mySwiper-3")?.swiper?.autoplay;
      if (autoplay) autoplay.stop(); // cleanup to avoid memory leaks
    };
  }, [dispatch]);

  return (
    <div className="employeeTestimonial container py-5">
      <h1 className="text-start split2">Employee Testimonials</h1>
      <p className="text-start split2">Stories of Growth and Success</p>

      {loading && <p className="text-center">Loading Testimonials...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && testimonials.length === 0 && (
        <p className="text-center">No Testimonials Found</p>
      )}

      {!loading && testimonials.length > 0 && (
        <>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{
                el: ".custom-pagination",
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className}"></span>`,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Pagination, Autoplay, Navigation]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper-3"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <CareerTesti
                    image={item.image}
                    name={item.name}
                    role={item.designation}
                    description={item.content}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-controls d-flex justify-content-center align-items-center mt-3">
              <div className="swiper-button-prev"></div>
              <div className="custom-pagination mx-3"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeTestimonial;
