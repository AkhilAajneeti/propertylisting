import { React, useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getTestimonials } from "../api/testimonialApi";
import Loader from "../components/Loader";

gsap.registerPlugin(ScrollTrigger);
const ClientTestimonials = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then((data) => setTestimonials(data))
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    // --- TEXT ANIMATION ---
    gsap.utils.toArray(".text-drop__line").forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1, // slight stagger
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup
   
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1200, // default duration
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);

  if (loading)
    return (
      <p>
        <Loader />
      </p>
    );
  return (
    <div>
      <div className="ClientTestimonial"></div>

      {/* ClientTestimonials */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="leftItem p-1 p-sm-3 p-md-5">
              <p
                className="text-gradient fs-4 fw-medium "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <img src="/icons8-home.gif" alt="clientImg" className="gif" />
                Client Testimonial
              </p>
              <h2
                className="fs-1 fw-bold text-drop__line"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                Hear From Happy Homeowners
              </h2>
              <p data-aos="fade-up" data-aos-duration="1800">
                Discover what our satisfied homeowners have to say about their
                journey . Real stories, real experiences and real trust - built
                one home at a time.
              </p>
              <div
                className="imageContainer d-flex align-items-center pb-3"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <img
                  className="rounded-circle"
                  width="50"
                  height="50"
                  src="/client-1.png"
                  alt="clientImg"
                />
                <img
                  className="rounded-circle"
                  style={{ border: "2px solid #fff", marginLeft: "-15px" }}
                  width="50"
                  height="50"
                  src="/client-2.png"
                  alt="clientImg"
                />
                <img
                  className="rounded-circle"
                  style={{ border: "2px solid #fff", marginLeft: "-15px" }}
                  width="50"
                  height="50"
                  src="/client-3.png"
                  alt="clientImg"
                />
                <p className="ciclecards">10K</p>
              </div>
              <p
                className="fw-medium"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                More Than <span className="text-gradient fs-5">25K</span>{" "}
                Clients Reviews
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center testimonial">
            {/*  */}
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay, Navigation, EffectFade]}
              loop={true}
              pagination={{
                el: ".custom-pagination",
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className}"></span>`;
                },
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1, // 👈 mobile (default)
                },
                768: {
                  slidesPerView: 1, // 👈 tablets
                },
                1024: {
                  slidesPerView: 1, // 👈 desktop
                },
              }} className="mySwiper-2 py-3" >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="card shadow-sm border-1 p-4 rounded-3"
                    style={{ borderColor: "#e94b35" }}
                  >
                    {/* Rating Dynamic */}
                    <div className="mb-2 text-warning">
                      {[...Array(5)].map((_, i) =>
                        i < item.rating ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        )
                      )}
                    </div>

                    {/* Review Dynamic */}
                    <p className="fst-italic text-secondary fw-semibold">
                      “{item.content}”
                    </p>

                    {/* Profile Section Dynamic */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image || "/client-1.png"}
                          alt={item.name}
                          className="rounded-circle me-3"
                          width="70"
                          height="70"
                        />
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">
                            {item.name}
                          </h6>
                          <small className="text-muted">
                            {item.designation}
                          </small>
                        </div>
                      </div>

                      {/* Quote Icon */}
                      <img
                        width="80"
                        height="80"
                        src="/straight-quotes.png"
                        alt="clientImg"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-controls d-flex justify-content-center align-items-center mt-3">
              <div className="swiper-button-prev"></div>
              <div className="custom-pagination mx-3"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
