import { React, useState, useEffect } from "react";
import {
  FaTelegramPlane,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoIosMail } from "react-icons/io";
import { PiBuildingOfficeFill } from "react-icons/pi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import SplitType from "split-type";
import { toast } from "react-toastify";
import { submitContactForm } from "../api/contactApi";
gsap.registerPlugin(ScrollTrigger);
const Contact = () => {
  // const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 🔥 Optimized GSAP Animation Setup
  useEffect(() => {
    document.fonts.ready.then(() => {
      const elements = document.querySelectorAll(".text-animate");

      elements.forEach((el) => {
        const split = new SplitType(el, { types: "words" });

        gsap.from(split.words, {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm(form);

      toast.success("Message sent successfully 🎉");

      setForm({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact Form Error:", err);
      toast.error("Something went wrong ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="ContactBanner">
        <h1 className="text-animate">Contact Us</h1>
      </div>

      {/* contact form */}
      <div className="contactform py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="text-drop__line text-gradient">Get In Touch</h1>
            <p className="text-drop__line text-center">
              Wheather you are looking for invest , enquire or collaborate - our
              team is always here to help you
            </p>
          </div>
          <div className="row pt-5 pb-3 gy-4">
            <div className="col-12 col-sm-6 formcol">
              <h1>
                Send us a <span className="brown">message</span>
              </h1>
              <p className="text-white">We’ll Contact You Within 24 Hours</p>
              <form className="pt-4" onSubmit={handleSubmit}>
                <div className="row gy-4">
                  <div className="col-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Your phone number"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className=" col-12 d-flex align-items-baseline justify-content-center gap-2">
                    <input type="checkbox" checked className="w-auto " />
                    <p className="text-light">
                      I authorize jenika ventures to send notifications via SMS,
                      RCS, Call
                    </p>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="animated-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Submit <FaTelegramPlane />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-sm-5 addressCol offset-sm-1 ">
              <div className="addressSection ">
                <h2>Head Office</h2>
                <ul style={{ paddingLeft: "0px", paddingTop: "10px" }}>
                  <li>
                    <div className="d-flex align-items-center gap-3">
                      <div className="icon-2">
                        {" "}
                        <FaLocationDot className="brown" />
                      </div>
                      <div className="content">
                        <h5>Office Address :</h5>
                        <p>
                          6th Floor, Assotech Business Cresterra, Unit -627,
                          Tower-1, Sector-135, Noida, Gautam Buddha Nagar, Uttar
                          Pradesh, 201301
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-3">
                      <div className="icon-2">
                        {" "}
                        <PiPhoneCallFill className="brown" />
                      </div>
                      <div className="content">
                        <h5>Phone Number :</h5>
                        <p>Office: 9999570772</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-3">
                      <div className="icon-2">
                        {" "}
                        <IoIosMail className="brown" />
                      </div>
                      <div className="content">
                        <h5>E-mail :</h5>
                        <p>Office: info@jenikaventures.com</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-3">
                      <div className="icon-2">
                        {" "}
                        <PiBuildingOfficeFill className="brown" />
                      </div>
                      <div className="content">
                        <h5>Working Hours :</h5>
                        <p>Mon–Sun | 10 AM – 7 PM</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="followupSection">
                <h2>Follow Us</h2>
                {/* Social Links */}
                <div className="d-flex gap-3 my-3">
                  <a href="#" className="text-light">
                    <FaFacebookF className="brown" />
                  </a>
                  <a href="#" className="text-light">
                    <FaTwitter className="brown" />
                  </a>
                  <a href="#" className="text-light">
                    <FaLinkedinIn className="brown" />
                  </a>
                  <a href="#" className="text-light">
                    <FaInstagram className="brown" />
                  </a>
                  <a href="#" className="text-light">
                    <FaYoutube className="brown" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="presence pb-5 contactCard">
        <div className="container">
          <div className="presenceContent d-flex justify-content-between align-items-center py-1 flex-column flex-sm-row">
            <div className="left">
              <h1 className="text-drop__line  text-center text-sm-start">
                Our Presence
              </h1>
              <p className="text-drop__line text-center text-sm-start">
                Let’s Connect and Build Your Dream Home Together
              </p>
            </div>
            <div className="right">
              <div class="tg-button-wrap">
                <a class="btn border-white" href="about.html">
                  Contact Now
                </a>
              </div>
            </div>
          </div>

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
                slidesPerView: 2, // 👈 tablets
              },
              1024: {
                slidesPerView: 3, // 👈 desktop
              },
            }}
            className="mySwiper-2 py-3"
          >
            <SwiperSlide>
              <div className="card shine precard ">
                <div className="logo m-auto">
                  <img
                    src="/Group-2.png"
                    alt="Anarock"
                    height="50"
                    className="ms-4"
                  />
                </div>
                <h4 className="text-center">Noida</h4>
                <ul>
                  <li>
                    <FaLocationDot /> 203-205, 2nd Floor, Tower-1, Assotech
                    Business Cresterra, Sector 135, Noida, Uttar Pradesh 201304
                  </li>
                  <li>
                    <IoIosCall /> +91 99995 70772
                  </li>
                  <li>
                    <IoIosMail /> info@jenikaventures.com
                  </li>
                </ul>
                {/* <button>Direction</button> */}
                <a
                  href="https://maps.app.goo.gl/HuANsCQeA4UbNRzg6"
                  target="_blank"
                >
                  Direction
                </a>
                <img src="/globe.png" alt="" className="overflowImg" />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="card shine precard ">
                <div className="logo m-auto">
                  <img
                    src="/Group-2.png"
                    alt="Anarock"
                    height="50"
                    className="ms-4"
                  />
                </div>
                <h4 className="text-center">Gurgaon</h4>
                <ul>
                  <li>
                    <FaLocationDot /> 5th floor, Suncity Success Tower, Unit
                    no.508, Sector 65, Gurugram, Haryana 122101
                  </li>
                  <li>
                    <IoIosCall /> +91 98736 38389
                  </li>
                  <li>
                    <IoIosMail /> info@jenikaventures.com
                  </li>
                </ul>
                {/* <button>Direction</button> */}
                <a
                  href="https://maps.app.goo.gl/1fhgbb8uZXyDNw218"
                  target="_blank"
                >
                  Direction
                </a>
                <img src="/globe.png" alt="" className="overflowImg" />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="card shine precard ">
                <div className="logo m-auto">
                  <img
                    src="/Group-2.png"
                    alt="Anarock"
                    height="50"
                    className="ms-4"
                  />
                </div>
                <h4 className="text-center">Kolkata </h4>
                <ul>
                  <li>
                    <FaLocationDot /> 5th Floor, PS ABACUS, Unit No. 511, PLOT
                    NO- 11E/23, near CC2, Newtown, Kolkata, West Bengal 700156
                  </li>
                  <li>
                    <IoIosCall /> +91 98362 58140
                  </li>
                  <li>
                    <IoIosMail /> info@jenikaventures.com
                  </li>
                </ul>
                {/* <button>Direction</button> */}
                <a
                  href="https://maps.app.goo.gl/WDuXaAADaqBzmp2v7"
                  target="_blank"
                >
                  Direction
                </a>
                <img src="/globe.png" alt="" className="overflowImg" />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="card shine precard ">
                <div className="logo m-auto">
                  <img
                    src="/Group-2.png"
                    alt="Anarock"
                    height="50"
                    className="ms-4"
                  />
                </div>
                <h4 className="text-center">Bengaluru </h4>
                <ul>
                  <li>
                    <FaLocationDot />
                    H210 36/5 Hustlehub Tech Park, Sector 2, HSR Layout,
                    Bengaluru, Karnataka 560102
                  </li>
                  <li>
                    <IoIosCall /> +91 90083 50584
                  </li>
                  <li>
                    <IoIosMail /> info@jenikaventures.com
                  </li>
                </ul>
                {/* <button>Direction</button> */}
                <a
                  href="https://maps.app.goo.gl/BTDXuw9WeA2GWQgKA"
                  target="_blank"
                >
                  Direction
                </a>
                <img src="/globe.png" alt="" className="overflowImg" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="map">
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.4647299499675!2d77.39939317461142!3d28.495662475739767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce91df5678fc5%3A0x2812fab7d34ca54a!2sJenika%20Ventures%20LLP!5e0!3m2!1sen!2sin!4v1760513877611!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
