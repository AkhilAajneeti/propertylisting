import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";

const BrochurePopup = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // parent ko data bhej
    onClose(); // popup close
  };

  return (
    <div className="popupOverlay">
      <div className="popupBox contactform">
        <button className="closeBtn" onClick={onClose}>
          ✖
        </button>

        <p className="formtagline text-center mb-0 mt-3">
          <span className="text-gradient2 fs-4 fw-bold">Download Brochure</span>
          <br /> Fill details to continue
        </p>
        <div
          className="formcol formRadius"
          style={{ background: "none", padding: "16px 18px" }}
        >
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="row gy-3">
              <div className="col-12">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
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
                  pattern="^\d{10}$"
                  inputMode="numeric" // ✅ camelCase
                  maxLength={10}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  name="city"
                  placeholder="Your City"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label
                  style={{
                    display: "flex",
                    alignItems: "start",
                    gap: "6px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    checked
                    style={{ marginTop: "4px", width: "auto" }}
                  />
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#ffffffff",
                      margin: 0,
                      lineHeight: "14px",
                    }}
                  >
                    I authorize company representatives to Call, SMS, Email or
                    WhatsApp me about its products and offers. This consent
                    overrides any registration for DNC/NDNC.
                  </p>
                </label>
              </div>
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="animated-btn"
                  style={{ width: "230px", height: "54px" }}
                >
                  Submit <FaTelegramPlane />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrochurePopup;
