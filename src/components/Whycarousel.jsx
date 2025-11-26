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
              <img src="/content1.png" alt="" width={"100px"} height={"100px"} />
              {/* para */}
              <h5 >Why Trust Jenika Venture</h5>
              {/* content */}
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt facere reiciendis dignissimos illo iure nobis ab minus
                vero eveniet at!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="WHySection text-center">
              {/* img */}
              <img src="/content2.png" alt="" width={"100px"} height={"100px"}/>
              {/* para */}
              <h5>Customer Oriented</h5>
              {/* content  */}
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt facere reiciendis dignissimos illo iure nobis ab minus
                vero eveniet at!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="WHySection text-center">
              {/* img */}
              <img src="/content3.png" alt="" width={"100px"} height={"100px"}/>
              {/* para */}
              <h5>Tech Ideal</h5>
              {/* content */}
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt facere reiciendis dignissimos illo iure nobis ab minus
                vero eveniet at!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Whycarousel;
