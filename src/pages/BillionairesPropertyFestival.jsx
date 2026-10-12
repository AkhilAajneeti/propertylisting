import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { toast } from "react-toastify";

import SEO from "../components/seo/SEO";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../redux/slices/propertySlice";
import { submitContactForm } from "../api/contactApi";

const FESTIVAL_CITIES = ["Noida", "Gurugram"];
const BANNER = "/live-banner.jpg.jpeg";

export default function BillionairesPropertyFestival() {
  const dispatch = useDispatch();
  const { data: projects = [], projectsError } = useSelector(
    (state) => state.projects,
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  const festivalProjects = useMemo(
    () =>
      (projects || []).filter((p) =>
        FESTIVAL_CITIES.includes((p.City || "").trim()),
      ),
    [projects],
  );

  // Close on Escape, and stop the page behind scrolling while it is open.
  useEffect(() => {
    if (!showThankYou) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setShowThankYou(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showThankYou]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Same checks as the contact page, so both forms reject the same input.
  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!form.mobile.trim()) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error("Enter valid 10-digit mobile number");
      return false;
    }
    if (!form.message.trim()) {
      toast.error("Message cannot be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await submitContactForm({
        ...form,
        // Tags the lead so these can be told apart from contact-page
        // enquiries - /contact/ is shared by both forms.
        message: `[Billionaires Property Festival enquiry]\n\n${form.message}`,
      });

      setForm({ name: "", email: "", mobile: "", message: "" });
      setShowThankYou(true);
    } catch (err) {
      console.error("BPF Enquiry Error:", err);
      if (err.response) {
        toast.error(
          err.response.data?.message || "Server error, please try again",
        );
      } else if (err.request) {
        toast.error("Server not responding. Please try later");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bpf-page">
      <SEO
        title="The Billionaires Property Festival | Jenika Ventures Private Limited"
        description="Buy 1 Get 1 Free this festive season - 11 October to 15 November 2026. Explore handpicked residential and commercial projects across Noida and Gurugram."
        image={BANNER}
      />

      {/* Banner - same artwork as the home page teaser */}
      <div className="bpf-banner">
        <img src={BANNER} alt="The Billionaires Property Festival - Buy 1 Get 1 Free" />
      </div>

      {/* Properties */}
      <section className="container py-5">
        <h2 className="bpf-heading text-center">Festival Properties</h2>
        <p className="bpf-subheading text-center">
          Handpicked projects across Noida and Gurugram
        </p>

        {projectsError ? (
          <div className="text-center py-4">
            <p className="text-danger mb-3">Unable to load projects right now.</p>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => dispatch(fetchProjects())}
            >
              Retry
            </button>
          </div>
        ) : projects.length === 0 ? (
          <Loader />
        ) : festivalProjects.length === 0 ? (
          <p className="text-center py-4">No festival properties listed yet.</p>
        ) : (
          <div className="bpf-sliderWrap position-relative">
            <Swiper
              slidesPerView={3}
              spaceBetween={24}
              grabCursor={true}
              loop={festivalProjects.length > 3}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation={{
                prevEl: ".bpf-nav--prev",
                nextEl: ".bpf-nav--next",
              }}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="py-4"
            >
              {festivalProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="bpf-nav bpf-nav--prev"
              aria-label="Previous property"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 5L8 12l7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="bpf-nav bpf-nav--next"
              aria-label="Next property"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Enquiry */}
      <section className="bpf-enquiry">
        <div className="container">
          <div className="bpf-enquiry__card">
            <h2 className="bpf-heading text-center">
              Billionaire Property Festival Enquiry
            </h2>
            <p className="bpf-subheading text-center">
              Leave your details and our team will call you back
            </p>

            <form className="bpf-form" onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name*"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address*"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    placeholder="Mobile Number*"
                    value={form.mobile}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    rows="4"
                    className="form-control"
                    placeholder="Tell us what you are looking for*"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="bpf-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Thank you */}
      {showThankYou && (
        <div
          className="bpf-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bpf-thanks-title"
          onClick={() => setShowThankYou(false)}
        >
          <div
            className="bpf-modal__card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="bpf-modal__close"
              aria-label="Close"
              onClick={() => setShowThankYou(false)}
            >
              ×
            </button>

            <div className="bpf-modal__logoWrap">
              <img
                src="/BPF-logo.jpeg"
                alt="The Billionaires Property Festival"
                className="bpf-modal__logo"
              />
            </div>

            <h3 id="bpf-thanks-title" className="bpf-modal__title">
              Thank You!
            </h3>
            <p className="bpf-modal__text">
              Your enquiry has been received. Our team will get in touch with
              you shortly about the Billionaires Property Festival.
            </p>

            <div className="bpf-modal__btnWrap">
              <button
                type="button"
                className="bpf-submit"
                onClick={() => setShowThankYou(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
