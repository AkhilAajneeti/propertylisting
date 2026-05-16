import React, { useEffect, useMemo, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaChartLine,
  FaRupeeSign,
  FaFileSignature,
  FaCheckCircle,
  FaShieldAlt,
  FaTelegramPlane,
  FaArrowLeft,
  FaLock,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { toast } from "react-toastify";
import SEO from "../components/seo/SEO";
import {
  createClientRegistration,
  initiateYesBankPayment,
} from "../api/clientRegistrationApi";

gsap.registerPlugin(ScrollTrigger);

const TODAY = new Date().toISOString().split("T")[0];

const PROPERTY_TYPE_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "plots_land", label: "Plots / Land" },
  { value: "pre_leased", label: "Pre-Leased" },
];

const REGISTRATION_FEE_OPTIONS = [
  { value: 5000, fee: "₹5,000", range: "Up to ₹50 Lakhs" },
  { value: 10000, fee: "₹10,000", range: "₹1 Crore – ₹2 Crore" },
  { value: 20000, fee: "₹20,000", range: "₹2 Crore – ₹5 Crore" },
  { value: 50000, fee: "₹50,000", range: "₹5 Crore – ₹10 Crore" },
  { value: 100000, fee: "₹1,00,000", range: "₹10 Crore+" },
];

const PAYMENT_MODE_OPTIONS = [
  { value: "upi", label: "UPI" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "debit_card", label: "Debit Card" },
  { value: "credit_card", label: "Credit Card" },
];

const MEETING_TIME_OPTIONS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

const INITIAL_FORM = {
  full_name: "",
  mobile_number: "",
  email: "",
  residential_address: "",
  city: "",
  pincode: "",
  meeting_date: "",
  meeting_time: "",
  investment_budget: "",
  preferred_property_type: "",
  preferred_locations: "",
  registration_fee: "",
  payment_mode: "",
  transaction_reference: "",
  declaration_accepted: false,
  client_signature_name: "",
  declaration_date: TODAY,
};

const formatINR = (amount) => {
  if (amount === null || amount === undefined || amount === "") return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `₹${amount}`;
  }
};

const ClientRegistration = () => {
  const [step, setStep] = useState("form"); // "form" | "review"
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [registration, setRegistration] = useState(null);

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
  }, [step]);

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

  const handleFeeSelect = (value) => {
    setForm((prev) => ({ ...prev, registration_fee: value }));
    if (errors.registration_fee) {
      setErrors((prev) => ({ ...prev, registration_fee: "" }));
    }
  };

  const handlePaymentModeSelect = (value) => {
    setForm((prev) => ({ ...prev, payment_mode: value }));
    if (errors.payment_mode) {
      setErrors((prev) => ({ ...prev, payment_mode: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10,12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pincodeRegex = /^\d{6}$/;

    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";

    if (!form.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!phoneRegex.test(form.mobile_number)) {
      newErrors.mobile_number =
        "Enter a 10–12 digit mobile number (digits only, no +91)";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.residential_address.trim()) {
      newErrors.residential_address = "Residential address is required";
    }

    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(form.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!form.meeting_date) newErrors.meeting_date = "Meeting date is required";
    if (!form.meeting_time)
      newErrors.meeting_time = "Meeting time is required";

    if (!form.investment_budget.trim()) {
      newErrors.investment_budget = "Investment budget is required";
    }

    if (!form.preferred_property_type) {
      newErrors.preferred_property_type = "Please select a property type";
    }

    if (!form.preferred_locations.trim()) {
      newErrors.preferred_locations = "Preferred locations are required";
    }

    if (!form.registration_fee) {
      newErrors.registration_fee = "Please select a registration fee tier";
    }

    if (!form.payment_mode) {
      newErrors.payment_mode = "Please select a payment mode";
    }

    if (!form.client_signature_name.trim()) {
      newErrors.client_signature_name =
        "Please type your full name as signature";
    }

    if (!form.declaration_accepted) {
      newErrors.declaration_accepted =
        "You must accept the declaration to proceed";
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

    const payload = {
      ...form,
      registration_fee: Number(form.registration_fee),
    };

    try {
      const res = await createClientRegistration(payload);
      setRegistration(res.data);
      toast.success("Registration saved. Proceed to payment 🎉");
      setStep("review");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Client Registration Error:", err);
      if (err.response) {
        const data = err.response.data;
        if (data && typeof data === "object") {
          const fieldErrors = {};
          Object.entries(data).forEach(([key, val]) => {
            fieldErrors[key] = Array.isArray(val) ? val.join(", ") : String(val);
          });
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
          const firstMsg = Object.values(fieldErrors)[0];
          toast.error(firstMsg || "Please correct the highlighted fields");
        } else {
          toast.error("Server error, please try again");
        }
      } else if (err.request) {
        toast.error("Server not responding. Please try later");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    if (!registration?.id) return;
    setIsPaying(true);
    try {
      const res = await initiateYesBankPayment(registration.id);
      const { redirect_url } = res.data || {};
      if (!redirect_url) {
        toast.error("Payment gateway did not return a redirect URL");
        return;
      }
      window.location.href = redirect_url;
    } catch (err) {
      console.error("Initiate Payment Error:", err);
      if (err.response) {
        const message =
          err.response.data?.detail ||
          err.response.data?.message ||
          "Failed to initiate payment";
        toast.error(message);
      } else if (err.request) {
        toast.error("Server not responding. Please try later");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsPaying(false);
    }
  };

  const handleBackToForm = () => {
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldClass = (name) => `crf-field${errors[name] ? " crf-invalid" : ""}`;

  const selectedFee = useMemo(
    () =>
      REGISTRATION_FEE_OPTIONS.find(
        (opt) => String(opt.value) === String(form.registration_fee)
      ),
    [form.registration_fee]
  );

  const propertyTypeLabel = useMemo(
    () =>
      PROPERTY_TYPE_OPTIONS.find(
        (opt) => opt.value === form.preferred_property_type
      )?.label,
    [form.preferred_property_type]
  );

  const paymentModeLabel = useMemo(
    () =>
      PAYMENT_MODE_OPTIONS.find((opt) => opt.value === form.payment_mode)
        ?.label,
    [form.payment_mode]
  );

  return (
    <div className="crf-page">
      <SEO
        title="Client Registration | Jenika Ventures Private Limited"
        description="Register as a client with Jenika Ventures Private Limited. Real Estate Ki Home Delivery™ — secure your investment opportunity with a refundable registration."
      />

      {/* ===== Scoped styles ===== */}
      <style>{`
        .crf-page { font-family: "Montserrat", sans-serif; background: #f4f5f7; }

        .crf-banner { width: 100%; line-height: 0; background: #fff; }
        .crf-banner img { width: 100%; height: auto; display: block; }

        .crf-wrap { padding: 70px 0 90px; }
        .crf-intro { max-width: 760px; margin: 0 auto 50px; text-align: center; }
        .crf-intro__badge {
          display: inline-block;
          font-size: 11.5px; letter-spacing: 2px; text-transform: uppercase;
          font-weight: 600; color: #c80a17; background: #fdeaec;
          border: 1px solid #f4c9cd; padding: 7px 18px;
          border-radius: 100px; margin-bottom: 16px;
        }
        .crf-intro h1 { font-size: 44px; font-weight: 700; margin-bottom: 12px; }
        .crf-intro p { font-size: 17px; color: #5d5d5d; margin: 0; }

        /* Side panel */
        .crf-aside {
          position: sticky; top: 100px;
          background: linear-gradient(327deg, #c80a17 18%, #000000) 60%;
          border-radius: 18px; padding: 34px 28px; color: #fff;
          box-shadow: 0 30px 60px -28px rgba(200,10,23,0.55); overflow: hidden;
        }
        .crf-aside::before {
          content: ""; position: absolute; width: 240px; height: 240px;
          right: -90px; top: -90px;
          background: radial-gradient(circle, rgba(245,235,172,0.25), rgba(245,235,172,0));
        }
        .crf-aside h3 { font-size: 22px; font-weight: 700; margin-bottom: 6px; position: relative; }
        .crf-aside .crf-aside__sub { font-size: 13.5px; color: rgba(255,255,255,0.72); margin-bottom: 22px; }
        .crf-benefit {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.1); position: relative;
        }
        .crf-benefit:last-of-type { border-bottom: none; }
        .crf-benefit svg { color: #f5ebac; font-size: 18px; margin-top: 2px; flex-shrink: 0; }
        .crf-benefit h6 { margin: 0 0 2px; font-size: 14.5px; font-weight: 600; color: #fff; }
        .crf-benefit p { margin: 0; font-size: 12.5px; color: rgba(255,255,255,0.65); }
        .crf-aside__secure {
          margin-top: 22px; padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.14);
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.85); position: relative;
        }
        .crf-aside__secure svg { color: #f5ebac; }

        /* Form card */
        .crf-card {
          background: #ffffff; border-radius: 18px;
          padding: 14px 38px 40px;
          box-shadow: 0 30px 70px -35px #c80a17c9;
          border: 1px solid #ececf0;
        }
        .crf-card__head {
          text-align: center; padding: 26px 0 8px;
          border-bottom: 1px dashed #e3e3e8; margin-bottom: 8px;
        }
        .crf-card__head h2 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
        .crf-card__head p { font-size: 13.5px; color: #8a8a8a; margin: 0; }

        .crf-group { padding-top: 30px; }
        .crf-group__head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .crf-group__num {
          width: 40px; height: 40px; flex-shrink: 0; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #be973e, #f5ebac 55%, #b49249);
          color: #2b1a00; font-weight: 700; font-size: 15px;
          box-shadow: 0 8px 18px -8px rgba(180,146,73,0.8);
        }
        .crf-group__title { display: flex; flex-direction: column; }
        .crf-group__title strong { font-size: 17px; font-weight: 700; color: #1f1f1f; display: flex; align-items: center; gap: 8px; }
        .crf-group__title strong svg { color: #c80a17; font-size: 14px; }
        .crf-group__title span { font-size: 12px; color: #9a9a9a; }

        .crf-label {
          display: block; color: #3a3a3a; font-size: 13px;
          font-weight: 600; margin-bottom: 7px;
        }
        .crf-req { color: #c80a17; margin-left: 3px; }
        .crf-optional { color: #b3b3b3; font-weight: 400; margin-left: 4px; font-size: 11.5px; }

        .crf-card input,
        .crf-card select,
        .crf-card textarea {
          width: 100%; padding: 12px 14px; border-radius: 10px;
          border: 1.5px solid #e4e4ea; background: #f8f8fb;
          color: #2c2c2c; font-size: 14.5px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .crf-card select {
          appearance: none; -webkit-appearance: none; padding-right: 38px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23c80a17' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 13px center;
          cursor: pointer;
        }
        .crf-card input:hover,
        .crf-card select:hover,
        .crf-card textarea:hover { border-color: #d0aa6a; }
        .crf-card input:focus,
        .crf-card select:focus,
        .crf-card textarea:focus {
          outline: none; background: #fff;
          border-color: #b49249;
          box-shadow: 0 0 0 4px rgba(180,146,73,0.16);
        }
        .crf-card input::placeholder,
        .crf-card textarea::placeholder { color: #b0b0b0; }
        .crf-card input[readonly] { background: #efefef; color: #888; cursor: not-allowed; }
        .crf-invalid { border-color: #e0414b !important; box-shadow: 0 0 0 4px rgba(224,65,75,0.12) !important; }
        .crf-error { display: block; color: #d63b44; font-size: 12px; margin-top: 5px; font-weight: 500; }

        /* Fee table */
        .crf-fee-table {
          width: 100%; border-collapse: separate; border-spacing: 0;
          border: 1.5px solid #e4e4ea; border-radius: 12px; overflow: hidden;
          background: #fff;
        }
        .crf-fee-table thead th {
          background: #faf6ec; color: #6a5836;
          font-size: 12.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; padding: 12px 14px; text-align: left;
          border-bottom: 1px solid #f0e3c8;
        }
        .crf-fee-table tbody tr {
          cursor: pointer; transition: background 0.2s ease;
        }
        .crf-fee-table tbody tr + tr td { border-top: 1px solid #f1f1f4; }
        .crf-fee-table tbody tr:hover { background: #fffaf0; }
        .crf-fee-table tbody tr.is-selected {
          background: linear-gradient(90deg, #fdf6ea, #fff);
        }
        .crf-fee-table tbody tr.is-selected td:first-child { box-shadow: inset 3px 0 0 #b49249; }
        .crf-fee-table td { padding: 14px; font-size: 14px; color: #2c2c2c; vertical-align: middle; }
        .crf-fee-table td.crf-fee-amount { font-weight: 700; color: #1f1f1f; width: 30%; }
        .crf-fee-table td.crf-fee-range { color: #5d5d5d; }
        .crf-fee-table td.crf-fee-radio { width: 50px; text-align: center; }
        .crf-fee-table input[type="radio"] {
          width: 18px; height: 18px; cursor: pointer; accent-color: #c80a17;
          padding: 0; background: transparent; border: none;
        }
        .crf-fee-invalid {
          border-color: #e0414b !important; box-shadow: 0 0 0 4px rgba(224,65,75,0.12) !important;
        }

        /* Payment mode cards */
        .crf-pay-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .crf-pay-card {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px; border-radius: 10px;
          border: 1.5px solid #e4e4ea; background: #f8f8fb;
          cursor: pointer; font-size: 14px; font-weight: 600; color: #3a3a3a;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .crf-pay-card:hover { border-color: #d0aa6a; }
        .crf-pay-card.is-selected {
          background: #fff; border-color: #b49249;
          box-shadow: 0 0 0 4px rgba(180,146,73,0.16);
        }
        .crf-pay-card input[type="radio"] {
          width: 16px; height: 16px; accent-color: #c80a17;
          padding: 0; background: transparent; border: none;
        }

        .crf-benefit-note {
          background: #fdf6ee; border: 1px solid #f0dcc0; border-left: 3px solid #b49249;
          border-radius: 10px; padding: 13px 15px; font-size: 12.8px;
          line-height: 1.65; color: #6a5836; margin-top: 16px;
        }

        .crf-declaration-note {
          background: #fdf6ee; border: 1px solid #f0dcc0; border-left: 3px solid #b49249;
          border-radius: 10px; padding: 13px 15px; font-size: 12.8px;
          line-height: 1.6; color: #6a5836; margin-bottom: 18px;
        }
        .crf-consent {
          display: flex; align-items: flex-start; gap: 11px;
          background: #f8f8fb; border: 1.5px solid #e4e4ea;
          border-radius: 10px; padding: 14px 16px; transition: border-color 0.2s ease;
        }
        .crf-consent:hover { border-color: #d0aa6a; }
        .crf-card .crf-consent input {
          width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;
          cursor: pointer; accent-color: #c80a17; padding: 0;
        }
        .crf-consent p { margin: 0; font-size: 12.8px; color: #555; line-height: 1.55; }

        .crf-submit-wrap { display: flex; justify-content: center; padding-top: 34px; }
        .crf-submit {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          min-width: 280px; padding: 16px 40px;
          border: none; border-radius: 100px;
          background: linear-gradient(90deg, #be973e 3.99%, #f5ebac 55.49%, #b49249 100%);
          color: #2b1a00; font-size: 17px; font-weight: 700; cursor: pointer;
          box-shadow: 0 14px 30px -10px rgba(180,146,73,0.85);
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .crf-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(180,146,73,0.95); }
        .crf-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Review step */
        .crf-review { padding: 14px 0 4px; }
        .crf-review__back {
          display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px;
          border-radius: 100px; border: 1px solid #e4e4ea; background: #fff;
          color: #3a3a3a; font-size: 13px; font-weight: 600;
          cursor: pointer; margin-bottom: 18px; transition: border-color 0.2s ease;
        }
        .crf-review__back:hover { border-color: #b49249; }
        .crf-review__client-id {
          background: linear-gradient(90deg, #fdf6ee, #fff8eb);
          border: 1px solid #f0dcc0; border-radius: 12px;
          padding: 14px 18px; margin-bottom: 22px;
        }
        .crf-review__client-id small {
          display: block; font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; font-weight: 700; color: #b49249; margin-bottom: 4px;
        }
        .crf-review__client-id strong { font-size: 22px; color: #1f1f1f; font-weight: 700; }
        .crf-summary {
          border: 1px solid #ececf0; border-radius: 12px; overflow: hidden; background: #fff;
        }
        .crf-summary__row {
          display: flex; gap: 16px; padding: 13px 16px;
          border-bottom: 1px solid #f1f1f4; font-size: 14px;
        }
        .crf-summary__row:last-child { border-bottom: none; }
        .crf-summary__row dt { flex: 0 0 220px; color: #8a8a8a; font-weight: 500; }
        .crf-summary__row dd { flex: 1; color: #1f1f1f; font-weight: 600; margin: 0; word-break: break-word; }
        .crf-amount-card {
          margin-top: 22px;
          background: linear-gradient(327deg, #c80a17 18%, #000000) 60%;
          color: #fff; border-radius: 14px; padding: 22px 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          box-shadow: 0 20px 40px -22px rgba(200,10,23,0.6);
        }
        .crf-amount-card small {
          display: block; font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 4px;
        }
        .crf-amount-card strong { font-size: 28px; font-weight: 700; }
        .crf-pay-info {
          display: flex; align-items: center; gap: 8px;
          font-size: 12.5px; color: #6a5836; margin-top: 14px;
        }
        .crf-pay-info svg { color: #b49249; }

        @media (max-width: 991px) {
          .crf-aside { position: static; margin-bottom: 26px; }
          .crf-pay-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .crf-wrap { padding: 45px 0 60px; }
          .crf-intro h1 { font-size: 30px; }
          .crf-intro p { font-size: 15px; }
          .crf-card { padding: 10px 18px 30px; }
          .crf-group__head { gap: 10px; }
          .crf-submit { min-width: 100%; }
          .crf-summary__row { flex-direction: column; gap: 4px; }
          .crf-summary__row dt { flex: none; }
          .crf-amount-card { flex-direction: column; align-items: flex-start; }
          .crf-fee-table thead { display: none; }
          .crf-fee-table tbody tr { display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; padding: 12px; }
          .crf-fee-table tbody tr + tr { border-top: 1px solid #f1f1f4; }
          .crf-fee-table td { padding: 0; border: none !important; box-shadow: none !important; }
          .crf-fee-table td.crf-fee-amount { width: auto; grid-column: 1; }
          .crf-fee-table td.crf-fee-range { grid-column: 1; font-size: 12.5px; }
          .crf-fee-table td.crf-fee-radio { grid-row: 1 / span 2; grid-column: 2; align-self: center; }
        }
        @media (max-width: 480px) {
          .crf-pay-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="crf-wrap" id="crf-form">
        <div className="container">
          <div className="row gx-4 gy-4 justify-content-center">
            {/* Side panel */}
            <div className="col-12 col-lg-4 order-1 order-sm-0">
              <div className="crf-aside">
                <h3>Why Register With Us?</h3>
                <p className="crf-aside__sub">
                  Secure your investment access — refundable, transparent, and
                  benefit-aligned.
                </p>

                <div className="crf-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>Refundable Registration</h6>
                    <p>Refundable per applicable terms and conditions.</p>
                  </div>
                </div>
                <div className="crf-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>Up to 10x Value Benefits</h6>
                    <p>
                      Aligned at the time of final booking — partner offers and
                      exclusive pricing.
                    </p>
                  </div>
                </div>
                <div className="crf-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>Personalized Consultation</h6>
                    <p>Doorstep visits and dedicated investment guidance.</p>
                  </div>
                </div>
                <div className="crf-benefit">
                  <FaCheckCircle />
                  <div>
                    <h6>Pan-India Inventory</h6>
                    <p>Delhi NCR, Noida, Gurgaon, Pune, Goa &amp; more.</p>
                  </div>
                </div>

                <div className="crf-aside__secure">
                  <FaShieldAlt /> Payments secured by Yes Bank.
                </div>
              </div>
            </div>

            {/* Main card */}
            <div className="col-12 col-lg-8 order-0 order-sm-1">
              <div className="crf-card">
                {step === "form" && (
                  <>
                    <div className="crf-card__head">
                      <h2 className="text-gradient">
                        EOI Client Registration form
                      </h2>
                      <p className="text-center">
                        Fill the form below — payment to Yes Bank happens on
                        the next step.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      {/* 01: Client Details */}
                      <div className="crf-group">
                        <div className="crf-group__head">
                          <div className="crf-group__num">01</div>
                          <div className="crf-group__title">
                            <strong>
                              <FaUser /> Client Details
                            </strong>
                            <span>Tell us who you are</span>
                          </div>
                        </div>
                        <div className="row gy-3">
                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Full Name<span className="crf-req">*</span>
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
                              <span className="crf-error">
                                {errors.full_name}
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Mobile Number<span className="crf-req">*</span>
                            </label>
                            <input
                              type="tel"
                              name="mobile_number"
                              placeholder="9876543210"
                              value={form.mobile_number}
                              onChange={handleChange}
                              inputMode="numeric"
                              maxLength={12}
                              className={fieldClass("mobile_number")}
                            />
                            {errors.mobile_number && (
                              <span className="crf-error">
                                {errors.mobile_number}
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Email ID<span className="crf-req">*</span>
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
                              <span className="crf-error">{errors.email}</span>
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              City<span className="crf-req">*</span>
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
                              <span className="crf-error">{errors.city}</span>
                            )}
                          </div>

                          <div className="col-12 col-md-8">
                            <label className="crf-label">
                              Residential Address
                              <span className="crf-req">*</span>
                            </label>
                            <textarea
                              rows={2}
                              name="residential_address"
                              placeholder="123, Green Park, near City Mall"
                              value={form.residential_address}
                              onChange={handleChange}
                              className={fieldClass("residential_address")}
                            ></textarea>
                            {errors.residential_address && (
                              <span className="crf-error">
                                {errors.residential_address}
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-4">
                            <label className="crf-label">
                              Pincode<span className="crf-req">*</span>
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
                              <span className="crf-error">
                                {errors.pincode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 02: Consultation Scheduling */}
                      <div className="crf-group">
                        <div className="crf-group__head">
                          <div className="crf-group__num">02</div>
                          <div className="crf-group__title">
                            <strong>
                              <FaRegCalendarAlt /> Consultation Scheduling
                            </strong>
                            <span>Pick a slot that works for you</span>
                          </div>
                        </div>
                        <div className="row gy-3">
                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Meeting Date<span className="crf-req">*</span>
                            </label>
                            <input
                              type="date"
                              name="meeting_date"
                              min={TODAY}
                              value={form.meeting_date}
                              onChange={handleChange}
                              className={fieldClass("meeting_date")}
                            />
                            {errors.meeting_date && (
                              <span className="crf-error">
                                {errors.meeting_date}
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Meeting Time<span className="crf-req">*</span>
                            </label>
                            <select
                              name="meeting_time"
                              value={form.meeting_time}
                              onChange={handleChange}
                              className={fieldClass("meeting_time")}
                            >
                              <option value="">Select a time slot</option>
                              {MEETING_TIME_OPTIONS.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                            {errors.meeting_time && (
                              <span className="crf-error">
                                {errors.meeting_time}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 03: Investment Requirement */}
                      <div className="crf-group">
                        <div className="crf-group__head">
                          <div className="crf-group__num">03</div>
                          <div className="crf-group__title">
                            <strong>
                              <FaChartLine /> Investment Requirement
                            </strong>
                            <span>Help us match the right properties</span>
                          </div>
                        </div>
                        <div className="row gy-3">
                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Investment Budget
                              <span className="crf-req">*</span>
                            </label>
                            <input
                              type="text"
                              name="investment_budget"
                              placeholder="₹1.5 Cr"
                              value={form.investment_budget}
                              onChange={handleChange}
                              className={fieldClass("investment_budget")}
                            />
                            {errors.investment_budget && (
                              <span className="crf-error">
                                {errors.investment_budget}
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Preferred Property Type
                              <span className="crf-req">*</span>
                            </label>
                            <select
                              name="preferred_property_type"
                              value={form.preferred_property_type}
                              onChange={handleChange}
                              className={fieldClass("preferred_property_type")}
                            >
                              <option value="">Select property type</option>
                              {PROPERTY_TYPE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {errors.preferred_property_type && (
                              <span className="crf-error">
                                {errors.preferred_property_type}
                              </span>
                            )}
                          </div>

                          <div className="col-12">
                            <label className="crf-label">
                              Preferred Location(s)
                              <span className="crf-req">*</span>
                            </label>
                            <textarea
                              rows={2}
                              name="preferred_locations"
                              placeholder="e.g. Noida Sector 150, Gurgaon Golf Course Road, Pune Hinjewadi"
                              value={form.preferred_locations}
                              onChange={handleChange}
                              className={fieldClass("preferred_locations")}
                            ></textarea>
                            {errors.preferred_locations && (
                              <span className="crf-error">
                                {errors.preferred_locations}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 04: Registration Fee + Payment */}
                      <div className="crf-group">
                        <div className="crf-group__head">
                          <div className="crf-group__num">04</div>
                          <div className="crf-group__title">
                            <strong>
                              <FaRupeeSign /> Registration Fee &amp; Payment
                            </strong>
                            <span>Choose your tier and payment mode</span>
                          </div>
                        </div>

                        <label className="crf-label">
                          Registration Fee Tier
                          <span className="crf-req">*</span>
                        </label>
                        <div
                          className={
                            errors.registration_fee
                              ? "crf-fee-invalid"
                              : undefined
                          }
                          style={{ borderRadius: 12 }}
                        >
                          <table className="crf-fee-table" role="radiogroup">
                            <thead>
                              <tr>
                                <th>Registration Fee</th>
                                <th>Property Value Range</th>
                                <th aria-label="Select"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {REGISTRATION_FEE_OPTIONS.map((opt) => {
                                const selected =
                                  String(form.registration_fee) ===
                                  String(opt.value);
                                return (
                                  <tr
                                    key={opt.value}
                                    className={selected ? "is-selected" : ""}
                                    onClick={() => handleFeeSelect(opt.value)}
                                  >
                                    <td className="crf-fee-amount">
                                      {opt.fee}
                                    </td>
                                    <td className="crf-fee-range">
                                      Property Value: {opt.range}
                                    </td>
                                    <td className="crf-fee-radio">
                                      <input
                                        type="radio"
                                        name="registration_fee"
                                        value={opt.value}
                                        checked={selected}
                                        onChange={() =>
                                          handleFeeSelect(opt.value)
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        {errors.registration_fee && (
                          <span className="crf-error">
                            {errors.registration_fee}
                          </span>
                        )}

                        <p className="crf-benefit-note">
                          The registration amount will be aligned with enhanced
                          value benefits at the time of final property booking.
                          Jenika Ventures may provide value advantages up to 10x
                          on the registered amount through exclusive pricing,
                          partner offers, or additional benefits, subject to
                          project-specific terms and prevailing market
                          conditions. This registration amount is fully
                          refundable as per applicable terms and conditions.
                          T&amp;C apply*
                        </p>

                        <div style={{ marginTop: 22 }}>
                          <label className="crf-label">
                            Payment Mode<span className="crf-req">*</span>
                          </label>
                          <div className="crf-pay-grid">
                            {PAYMENT_MODE_OPTIONS.map((opt) => {
                              const selected = form.payment_mode === opt.value;
                              return (
                                <label
                                  key={opt.value}
                                  className={`crf-pay-card${
                                    selected ? " is-selected" : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="payment_mode"
                                    value={opt.value}
                                    checked={selected}
                                    onChange={() =>
                                      handlePaymentModeSelect(opt.value)
                                    }
                                  />
                                  {opt.label}
                                </label>
                              );
                            })}
                          </div>
                          {errors.payment_mode && (
                            <span className="crf-error">
                              {errors.payment_mode}
                            </span>
                          )}
                        </div>

                        <div className="row gy-3" style={{ marginTop: 4 }}>
                          <div className="col-12">
                            <label className="crf-label">
                              Transaction Reference
                              <span className="crf-optional">
                                (optional — only if paid offline)
                              </span>
                            </label>
                            <input
                              type="text"
                              name="transaction_reference"
                              placeholder="UTR / Ref number"
                              value={form.transaction_reference}
                              onChange={handleChange}
                              className={fieldClass("transaction_reference")}
                            />
                            {errors.transaction_reference && (
                              <span className="crf-error">
                                {errors.transaction_reference}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="crf-pay-info">
                          <FaLock /> You'll be redirected to Yes Bank's secure
                          checkout after the next step.
                        </div>
                      </div>

                      {/* 05: Declaration */}
                      <div className="crf-group">
                        <div className="crf-group__head">
                          <div className="crf-group__num">05</div>
                          <div className="crf-group__title">
                            <strong>
                              <FaFileSignature /> Client Declaration
                            </strong>
                            <span>Confirm &amp; authorize your request</span>
                          </div>
                        </div>
                        <p className="crf-declaration-note">
                          I hereby confirm that I have voluntarily registered
                          for investment services provided by Jenika Ventures
                          Private Limited. I understand the nature of the
                          services offered and agree to the terms mentioned
                          above, including the refund and benefit-alignment
                          policy.
                        </p>
                        <div className="row gy-3">
                          <div className="col-12 col-md-6">
                            <label className="crf-label">
                              Signature (type full name)
                              <span className="crf-req">*</span>
                            </label>
                            <input
                              type="text"
                              name="client_signature_name"
                              placeholder="Rahul Sharma"
                              value={form.client_signature_name}
                              onChange={handleChange}
                              className={fieldClass("client_signature_name")}
                            />
                            {errors.client_signature_name && (
                              <span className="crf-error">
                                {errors.client_signature_name}
                              </span>
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="crf-label">Date</label>
                            <input
                              type="date"
                              name="declaration_date"
                              value={form.declaration_date}
                              readOnly
                              className="crf-field"
                            />
                          </div>

                          <div className="col-12">
                            <label className="crf-consent">
                              <input
                                type="checkbox"
                                name="declaration_accepted"
                                checked={form.declaration_accepted}
                                onChange={handleChange}
                              />
                              <p>
                                I accept the declaration above and authorize
                                Jenika Ventures Private Limited to contact me
                                regarding my investment via SMS, RCS, calls,
                                and email.
                              </p>
                            </label>
                            {errors.declaration_accepted && (
                              <span className="crf-error">
                                {errors.declaration_accepted}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="crf-submit-wrap">
                        <button
                          type="submit"
                          className="crf-submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              Continue to Payment <FaTelegramPlane />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {step === "review" && registration && (
                  <div className="crf-review">
                    <button
                      type="button"
                      className="crf-review__back"
                      onClick={handleBackToForm}
                    >
                      <FaArrowLeft /> Edit details
                    </button>

                    <div className="crf-card__head" style={{ paddingTop: 0 }}>
                      <h2 className="text-gradient">Review &amp; Pay</h2>
                      <p>
                        Confirm your details below — your registration is saved
                        and ready for payment.
                      </p>
                    </div>

                    <div className="crf-review__client-id">
                      <small>Your Client ID</small>
                      <strong>
                        {registration.client_id || `JV-${registration.id}`}
                      </strong>
                    </div>

                    <dl className="crf-summary">
                      <div className="crf-summary__row">
                        <dt>Full Name</dt>
                        <dd>{form.full_name}</dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Mobile</dt>
                        <dd>{form.mobile_number}</dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Email</dt>
                        <dd>{form.email}</dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>City / Pincode</dt>
                        <dd>
                          {form.city} — {form.pincode}
                        </dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Meeting</dt>
                        <dd>
                          {form.meeting_date} · {form.meeting_time}
                        </dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Property Type</dt>
                        <dd>{propertyTypeLabel || "—"}</dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Preferred Locations</dt>
                        <dd>{form.preferred_locations}</dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Investment Budget</dt>
                        <dd>{form.investment_budget}</dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Registration Tier</dt>
                        <dd>
                          {selectedFee
                            ? `${selectedFee.fee} · ${selectedFee.range}`
                            : "—"}
                        </dd>
                      </div>
                      <div className="crf-summary__row">
                        <dt>Payment Mode</dt>
                        <dd>{paymentModeLabel || "—"}</dd>
                      </div>
                    </dl>

                    <div className="crf-amount-card">
                      <div>
                        <small>Amount Payable</small>
                        <strong>
                          {formatINR(
                            registration.registration_fee_amount ||
                              form.registration_fee
                          )}
                        </strong>
                      </div>
                      <button
                        type="button"
                        className="crf-submit"
                        style={{ minWidth: 220 }}
                        onClick={handlePayNow}
                        disabled={!registration?.id || isPaying}
                      >
                        {isPaying ? (
                          "Redirecting…"
                        ) : (
                          <>
                            Pay Now <FaLock />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="crf-pay-info">
                      <FaShieldAlt /> You'll be redirected to Yes Bank's secure
                      checkout. Do not close this tab during payment.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientRegistration;
