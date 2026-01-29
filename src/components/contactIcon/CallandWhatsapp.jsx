import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";


const CallandWhatsapp = () => {
  return (
    <div className="floating-buttons">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919999570772" // replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Call Button */}
      <a
        href="tel:+919999570772" // replace with your number
        className="floating-btn call d-sm-none"
        aria-label="Call Now" >
        <FaPhoneAlt />
      </a>
    </div>
  );
};

export default CallandWhatsapp;
