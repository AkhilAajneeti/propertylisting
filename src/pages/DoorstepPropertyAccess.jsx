import { React, useState, useEffect } from "react";
import {
  FaTelegramPlane,
  FaUser,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaChartLine,
  FaFileSignature,
  FaUserTie,
  FaCheckCircle,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { toast } from "react-toastify";
import { submitDoorstepInquiry } from "../api/doorstepApi";
import SEO from "../components/seo/SEO";

gsap.registerPlugin(ScrollTrigger);

const TODAY = new Date().toISOString().split("T")[0];

const INTERESTED_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "plots_land", label: "Plots / Land" },
  { value: "pre_leased", label: "Pre-Leased Property" }
];

const BUDGET_OPTIONS = [
  { value: "upto_50l", label: "Up to ₹50 Lakh" },
  { value: "1cr_2cr", label: "₹1 Cr – ₹2 Cr" },
  { value: "2cr_5cr", label: "₹2 Cr – ₹5 Cr" },
  { value: "5cr_10cr", label: "₹5 Cr – ₹10 Cr" },
  { value: "10cr_plus", label: "₹10 Cr+" },
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

const INITIAL_FORM = {
  full_name: "",
  mobile_number: "",
  alternate_contact_number: "",
  email: "",
  occupation: "",
  company_name: "",
  residential_address: "",
  city: "",
  pincode: "",
  nearby_landmark: "",
  preferred_date: "",
  preferred_time: "",
  interested_in: "",
  investment_budget: "",
  consent: false,
  client_signature: "",
  declaration_date: TODAY,
  associate_name: "",
  associate_contact: "",
};

const DoorstepPropertyAccess = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 Same GSAP text animation setup used across the site
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
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pincodeRegex = /^\d{6}$/;

    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!form.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!phoneRegex.test(form.mobile_number)) {
      newErrors.mobile_number = "Enter a valid 10-digit mobile number";
    }

    if (
      form.alternate_contact_number.trim() &&
      !phoneRegex.test(form.alternate_contact_number)
    ) {
      newErrors.alternate_contact_number = "Enter a valid 10-digit number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    if (!form.residential_address.trim()) {
      newErrors.residential_address = "Residential address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (!form.preferred_date) {
      newErrors.preferred_date = "Preferred date is required";
    }

    if (!form.preferred_time) {
      newErrors.preferred_time = "Preferred time is required";
    }

    if (!form.interested_in) {
      newErrors.interested_in = "Please select a property type";
    }

    if (!form.investment_budget) {
      newErrors.investment_budget = "Please select a budget range";
    }

    if (
      form.associate_contact.trim() &&
      !phoneRegex.test(form.associate_contact)
    ) {
      newErrors.associate_contact = "Enter a valid 10-digit number";
    }

    if (!form.consent) {
      newErrors.consent = "Please provide your consent to proceed";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await submitDoorstepInquiry(form);

      toast.success("Consultation request submitted successfully 🎉");

      setForm({ ...INITIAL_FORM, declaration_date: TODAY });
      setErrors({});
    } catch (err) {
      console.error("Doorstep Inquiry Error:", err);

      // 🔥 Axios error handling (same pattern as Contact page)
      if (err.response) {
        const message =
          err.response.data?.message || "Server error, please try again";
        toast.error(message);
      } else if (err.request) {
        toast.error("Server not responding. Please try later");
      } else {
        toast.error("Unexpected error occurred ❌");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) => `dpa-field${errors[name] ? " dpa-invalid" : ""}`;

  return (
    <div className="dpa-page">
      <SEO
        title="Doorstep Property Access | Jenika Ventures Private Limited"
        description="Schedule a personalized property consultation and investment assistance at your convenience with Jenika Ventures Private Limited. Book a doorstep property visit today."
      />

      {/* ===== Scoped styles — prefixed with dpa- so nothing else is affected ===== */}
      <style>{`
        .dpa-page { font-family: "Montserrat", sans-serif; background: #f4f5f7; }

        /* ---------- BANNER (image only, no overlay) ---------- */
        .dpa-banner { width: 100%; line-height: 0; background: #fff; }
        .dpa-banner img { width: 100%; height: auto; display: block; }

        /* ---------- LAYOUT ---------- */
        .dpa-wrap { padding: 70px 0 90px; }
        .dpa-intro { max-width: 720px; margin: 0 auto 50px; text-align: center; }
        .dpa-intro__badge {
          display: inline-block;
          font-size: 11.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          color: #c80a17;
          background: #fdeaec;
          border: 1px solid #f4c9cd;
          padding: 7px 18px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .dpa-intro h1 { font-size: 44px; font-weight: 700; margin-bottom: 12px; }
        .dpa-intro p { font-size: 17px; color: #5d5d5d; margin: 0; }

        /* ---------- SIDE INFO PANEL ---------- */
        .dpa-aside {
          position: sticky;
          top: 100px;
          background: linear-gradient(327deg, #c80a17 18%, #000000) 60%;
          border-radius: 18px;
          padding: 34px 28px;
          color: #fff;
          box-shadow: 0 30px 60px -28px rgba(200,10,23,0.55);
          overflow: hidden;
        }
        .dpa-aside::before {
          content: "";
          position: absolute;
          width: 240px; height: 240px;
          right: -90px; top: -90px;
          background: radial-gradient(circle, rgba(245,235,172,0.25), rgba(245,235,172,0));
        }
        .dpa-aside h3 {
          font-size: 22px; font-weight: 700; margin-bottom: 6px; position: relative;
        }
        .dpa-aside .dpa-aside__sub { font-size: 13.5px; color: rgba(255,255,255,0.72); margin-bottom: 22px; }
        .dpa-benefit {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }
        .dpa-benefit:last-of-type { border-bottom: none; }
        .dpa-benefit svg { color: #f5ebac; font-size: 18px; margin-top: 2px; flex-shrink: 0; }
        .dpa-benefit h6 { margin: 0 0 2px; font-size: 14.5px; font-weight: 600; color: #fff; }
        .dpa-benefit p { margin: 0; font-size: 12.5px; color: rgba(255,255,255,0.65); }
        .dpa-aside__contact {
          margin-top: 22px; padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.14);
          position: relative;
        }
        .dpa-aside__contact a, .dpa-aside__contact span {
          display: flex; align-items: center; gap: 10px;
          color: #fff; text-decoration: none; font-size: 13.5px; margin-bottom: 10px;
        }
        .dpa-aside__contact svg { color: #f5ebac; }

        /* ---------- FORM CARD ---------- */
        .dpa-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 14px 38px 40px;
          box-shadow: 0 30px 70px -35px #c80a17c9;
          border: 1px solid #ececf0;
        }
        .dpa-card__head {
          text-align: center;
          padding: 26px 0 8px;
          border-bottom: 1px dashed #e3e3e8;
          margin-bottom: 8px;
        }
        .dpa-card__head h2 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
        .dpa-card__head p { font-size: 13.5px; color: #8a8a8a; margin: 0; }

        /* numbered group sections */
        .dpa-group { padding-top: 30px; }
        .dpa-group__head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .dpa-group__num {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #be973e, #f5ebac 55%, #b49249);
          color: #2b1a00; font-weight: 700; font-size: 15px;
          box-shadow: 0 8px 18px -8px rgba(180,146,73,0.8);
        }
        .dpa-group__title { display: flex; flex-direction: column; }
        .dpa-group__title strong { font-size: 17px; font-weight: 700; color: #1f1f1f; display: flex; align-items: center; gap: 8px; }
        .dpa-group__title strong svg { color: #c80a17; font-size: 14px; }
        .dpa-group__title span { font-size: 12px; color: #9a9a9a; }

        /* fields */
        .dpa-label {
          display: block; color: #3a3a3a; font-size: 13px;
          font-weight: 600; margin-bottom: 7px;
        }
        .dpa-req { color: #c80a17; margin-left: 3px; }
        .dpa-optional { color: #b3b3b3; font-weight: 400; margin-left: 4px; font-size: 11.5px; }

        .dpa-card input,
        .dpa-card select,
        .dpa-card textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1.5px solid #e4e4ea;
          background: #f8f8fb;
          color: #2c2c2c;
          font-size: 14.5px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .dpa-card select {
          appearance: none; -webkit-appearance: none; padding-right: 38px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23c80a17' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 13px center;
          cursor: pointer;
        }
        .dpa-card input:hover,
        .dpa-card select:hover,
        .dpa-card textarea:hover { border-color: #d0aa6a; }
        .dpa-card input:focus,
        .dpa-card select:focus,
        .dpa-card textarea:focus {
          outline: none; background: #fff;
          border-color: #b49249;
          box-shadow: 0 0 0 4px rgba(180,146,73,0.16);
        }
        .dpa-card input::placeholder,
        .dpa-card textarea::placeholder { color: #b0b0b0; }
        .dpa-card input[readonly] { background: #efefef; color: #888; cursor: not-allowed; }
        .dpa-invalid { border-color: #e0414b !important; box-shadow: 0 0 0 4px rgba(224,65,75,0.12) !important; }
        .dpa-error { display: block; color: #d63b44; font-size: 12px; margin-top: 5px; font-weight: 500; }

        /* declaration */
        .dpa-declaration-note {
          background: #fdf6ee; border: 1px solid #f0dcc0; border-left: 3px solid #b49249;
          border-radius: 10px; padding: 13px 15px; font-size: 12.8px;
          line-height: 1.6; color: #6a5836; margin-bottom: 18px;
        }
        .dpa-consent {
          display: flex; align-items: flex-start; gap: 11px;
          background: #f8f8fb; border: 1.5px solid #e4e4ea;
          border-radius: 10px; padding: 14px 16px; transition: border-color 0.2s ease;
        }
        .dpa-consent:hover { border-color: #d0aa6a; }
        .dpa-card .dpa-consent input {
          width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;
          cursor: pointer; accent-color: #c80a17; padding: 0;
        }
        .dpa-consent p { margin: 0; font-size: 12.8px; color: #555; line-height: 1.55; }

        /* submit */
        .dpa-submit-wrap { display: flex; justify-content: center; padding-top: 34px; }
        .dpa-submit {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          min-width: 280px; padding: 16px 40px;
          border: none; border-radius: 100px;
          background: linear-gradient(90deg, #be973e 3.99%, #f5ebac 55.49%, #b49249 100%);
          color: #2b1a00; font-size: 17px; font-weight: 700; cursor: pointer;
          box-shadow: 0 14px 30px -10px rgba(180,146,73,0.85);
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .dpa-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(180,146,73,0.95); }
        .dpa-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 991px) {
          .dpa-aside { position: static; margin-bottom: 26px; }
        }
        @media (max-width: 768px) {
          .dpa-wrap { padding: 45px 0 60px; }
          .dpa-intro h1 { font-size: 30px; }
          .dpa-intro p { font-size: 15px; }
          .dpa-card { padding: 10px 18px 30px; }
          .dpa-group__head { gap: 10px; }
          .dpa-submit { min-width: 100%; }
        }
      `}</style>

      {/* ================== BANNER (image only) ================== */}
      <section className="dpa-banner">
        <img
          src="/Doorstep%20Property%20Access.jpg.jpeg"
          alt="Doorstep Property Access - Real Estate Ki Home Delivery by Jenika Ventures"
        />
      </section>

      {/* ================== CONTENT ================== */}
      <section className="dpa-wrap" id="dpa-inquiry-form">
        <div className="container">
          <div className="dpa-intro">
            <span className="dpa-intro__badge">
              Jenika Ventures · Real Estate Ki Home Delivery™
            </span>
            <h1 className="text-mahroon text-animate">
              Doorstep Property Access
            </h1>
            <p>
              Schedule a personalized property consultation and investment
              assistance at your convenience.
            </p>
          </div>

          <div className="row gx-4 gy-4 justify-content-center">
            {/* ---- Side info panel ---- */}
            <div className="col-12 col-lg-4 order-1 order-sm-0">
              <div className="dpa-aside">
                <h3>Why Book a Doorstep Visit?</h3>
                <p className="dpa-aside__sub">
                  Real estate expertise — delivered right to you.
                </p>

                <div className="dpa-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>100% Transparent Dealings</h6>
                    <p>Verified properties &amp; clear paperwork.</p>
                  </div>
                </div>
                <div className="dpa-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>Expert Guidance</h6>
                    <p>End-to-end advisory &amp; investment support.</p>
                  </div>
                </div>
                <div className="dpa-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>At Your Convenience</h6>
                    <p>
                      Consultation scheduled on your preferred date &amp; time.
                    </p>
                  </div>
                </div>
                <div className="dpa-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>Pan-India Reach</h6>
                    <p>Delhi NCR, Noida, Gurgaon, Pune, Goa &amp; more.</p>
                  </div>
                </div>

                <div className="dpa-aside__contact">
                  <a href="tel:9999570772">
                    <FaPhoneAlt /> +91 99995 70772
                  </a>
                  <span>
                    <FaRegClock /> Mon–Sun | 10 AM – 7 PM
                  </span>
                </div>
              </div>
            </div>

            {/* ---- Form card ---- */}
            <div className="col-12 col-lg-8 order-0 order-sm-1">
              <div className="dpa-card">
                <div className="dpa-card__head">
                  <h2 className="text-gradient">
                    Client Registration &amp; Consultation Agreement
                  </h2>
                  <p>We&rsquo;ll contact you within 24 hours to confirm.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* ---- Group 1: Client Details ---- */}
                  <div className="dpa-group">
                    <div className="dpa-group__head">
                      <div className="dpa-group__num">01</div>
                      <div className="dpa-group__title">
                        <strong>
                          <FaUser /> Client Details
                        </strong>
                        <span>Tell us who we&rsquo;ll be meeting</span>
                      </div>
                    </div>
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Full Name<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          placeholder="Rahul Sharma"
                          value={form.full_name}
                          onChange={handleChange}
                          className={fieldClass("full_name")}
                        />
                        {errors.full_name && (
                          <span className="dpa-error">{errors.full_name}</span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Mobile Number<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile_number"
                          placeholder="9876543210"
                          value={form.mobile_number}
                          onChange={handleChange}
                          inputMode="numeric"
                          maxLength={10}
                          className={fieldClass("mobile_number")}
                        />
                        {errors.mobile_number && (
                          <span className="dpa-error">
                            {errors.mobile_number}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Alternate Contact Number
                          <span className="dpa-optional">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          name="alternate_contact_number"
                          placeholder="9123456780"
                          value={form.alternate_contact_number}
                          onChange={handleChange}
                          inputMode="numeric"
                          maxLength={10}
                          className={fieldClass("alternate_contact_number")}
                        />
                        {errors.alternate_contact_number && (
                          <span className="dpa-error">
                            {errors.alternate_contact_number}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Email ID<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="rahul@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className={fieldClass("email")}
                        />
                        {errors.email && (
                          <span className="dpa-error">{errors.email}</span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Occupation<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          placeholder="Business Owner"
                          value={form.occupation}
                          onChange={handleChange}
                          className={fieldClass("occupation")}
                        />
                        {errors.occupation && (
                          <span className="dpa-error">{errors.occupation}</span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Company Name
                          <span className="dpa-optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="company_name"
                          placeholder="Sharma Enterprises"
                          value={form.company_name}
                          onChange={handleChange}
                          className={fieldClass("company_name")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---- Group 2: Address Details ---- */}
                  <div className="dpa-group">
                    <div className="dpa-group__head">
                      <div className="dpa-group__num">02</div>
                      <div className="dpa-group__title">
                        <strong>
                          <FaMapMarkerAlt /> Address Details
                        </strong>
                        <span>Where should our associate reach you</span>
                      </div>
                    </div>
                    <div className="row gy-3">
                      <div className="col-12">
                        <label className="dpa-label">
                          Residential Address
                          <span className="dpa-req">*</span>
                        </label>
                        <textarea
                          rows={2}
                          name="residential_address"
                          placeholder="123, Green Park"
                          value={form.residential_address}
                          onChange={handleChange}
                          className={fieldClass("residential_address")}
                        ></textarea>
                        {errors.residential_address && (
                          <span className="dpa-error">
                            {errors.residential_address}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="dpa-label">
                          City<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Indore"
                          value={form.city}
                          onChange={handleChange}
                          className={fieldClass("city")}
                        />
                        {errors.city && (
                          <span className="dpa-error">{errors.city}</span>
                        )}
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="dpa-label">
                          Pincode<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="452001"
                          value={form.pincode}
                          onChange={handleChange}
                          inputMode="numeric"
                          maxLength={6}
                          className={fieldClass("pincode")}
                        />
                        {errors.pincode && (
                          <span className="dpa-error">{errors.pincode}</span>
                        )}
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="dpa-label">
                          Nearby Landmark
                          <span className="dpa-optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="nearby_landmark"
                          placeholder="Near City Mall"
                          value={form.nearby_landmark}
                          onChange={handleChange}
                          className={fieldClass("nearby_landmark")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---- Group 3: Consultation Scheduling ---- */}
                  <div className="dpa-group">
                    <div className="dpa-group__head">
                      <div className="dpa-group__num">03</div>
                      <div className="dpa-group__title">
                        <strong>
                          <FaRegCalendarAlt /> Consultation Scheduling
                        </strong>
                        <span>Pick a slot that works for you</span>
                      </div>
                    </div>
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Meeting Date<span className="dpa-req">*</span>
                        </label>
                        <input
                          type="date"
                          name="preferred_date"
                          min={TODAY}
                          value={form.preferred_date}
                          onChange={handleChange}
                          className={fieldClass("preferred_date")}
                        />
                        {errors.preferred_date && (
                          <span className="dpa-error">
                            {errors.preferred_date}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Meeting Time<span className="dpa-req">*</span>
                        </label>
                        <select
                          name="preferred_time"
                          value={form.preferred_time}
                          onChange={handleChange}
                          className={fieldClass("preferred_time")}
                        >
                          <option value="">Select a time slot</option>
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        {errors.preferred_time && (
                          <span className="dpa-error">
                            {errors.preferred_time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ---- Group 4: Investment Requirement ---- */}
                  <div className="dpa-group">
                    <div className="dpa-group__head">
                      <div className="dpa-group__num">04</div>
                      <div className="dpa-group__title">
                        <strong>
                          <FaChartLine /> Investment Requirement
                        </strong>
                        <span>Help us match the right properties</span>
                      </div>
                    </div>
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Preferred Property Type
                          <span className="dpa-req">*</span>
                        </label>
                        <select
                          name="interested_in"
                          value={form.interested_in}
                          onChange={handleChange}
                          className={fieldClass("interested_in")}
                        >
                          <option value="">Select property type</option>
                          {INTERESTED_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.interested_in && (
                          <span className="dpa-error">
                            {errors.interested_in}
                          </span>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Investment Budget<span className="dpa-req">*</span>
                        </label>
                        <select
                          name="investment_budget"
                          value={form.investment_budget}
                          onChange={handleChange}
                          className={fieldClass("investment_budget")}
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.investment_budget && (
                          <span className="dpa-error">
                            {errors.investment_budget}
                          </span>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* ---- Group 5: Client Declaration ---- */}
                  <div className="dpa-group">
                    <div className="dpa-group__head">
                      <div className="dpa-group__num">05</div>
                      <div className="dpa-group__title">
                        <strong>
                          <FaFileSignature /> Client Declaration
                        </strong>
                        <span>Confirm &amp; authorize your request</span>
                      </div>
                    </div>
                    <p className="dpa-declaration-note">
                      I hereby confirm that I have voluntarily opted for
                      consultation services provided by Jenika Ventures. I
                      understand the nature of services offered and agree to the
                      terms mentioned above.
                    </p>
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Signature of Client (type full name)
                          <span className="dpa-optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="client_signature"
                          placeholder="Rahul Sharma"
                          value={form.client_signature}
                          onChange={handleChange}
                          className={fieldClass("client_signature")}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">Date</label>
                        <input
                          type="date"
                          name="declaration_date"
                          value={form.declaration_date}
                          readOnly
                          className="dpa-field"
                        />
                      </div>

                      <div className="col-12">
                        <div className="dpa-consent">
                          <input
                            type="checkbox"
                            name="consent"
                            id="dpa-consent"
                            checked={form.consent}
                            onChange={handleChange}
                          />
                          <p>
                            I agree to the above declaration and authorize
                            Jenika Ventures Private Limited to contact me
                            regarding my property inquiry via SMS, RCS, calls,
                            and email.
                          </p>
                        </div>
                        {errors.consent && (
                          <span className="dpa-error">{errors.consent}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ---- Group 6: For Office Use Only ---- */}
                  <div className="dpa-group">
                    <div className="dpa-group__head">
                      <div className="dpa-group__num">06</div>
                      <div className="dpa-group__title">
                        <strong>
                          <FaUserTie /> For Office Use Only
                        </strong>
                        <span>Filled by the assisting associate</span>
                      </div>
                    </div>
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Associate Name
                          <span className="dpa-optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          name="associate_name"
                          placeholder="Amit Verma"
                          value={form.associate_name}
                          onChange={handleChange}
                          className={fieldClass("associate_name")}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="dpa-label">
                          Associate Contact
                          <span className="dpa-optional">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          name="associate_contact"
                          placeholder="9000000000"
                          value={form.associate_contact}
                          onChange={handleChange}
                          inputMode="numeric"
                          maxLength={10}
                          className={fieldClass("associate_contact")}
                        />
                        {errors.associate_contact && (
                          <span className="dpa-error">
                            {errors.associate_contact}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ---- Submit ---- */}
                  <div className="dpa-submit-wrap">
                    <button
                      type="submit"
                      className="dpa-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Inquiry <FaTelegramPlane />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="dpa-declaration-note mt-3">
                    <p>
                      Benefit Note:
                      The registration amount will be aligned with enhanced value benefits at the time of final property booking. Jenika Ventures may provide value advantages up to 10x on the registered amount through exclusive pricing, partner offers, or additional benefits, subject to project-specific terms and prevailing market conditions.This registration amount is fully refundable as per applicable terms and conditions.T&C apply*
                    </p>
                  </div>


                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoorstepPropertyAccess;