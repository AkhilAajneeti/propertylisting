import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const ContactBtn = ({ project }) => {
  return (
    <div className="contact-floating-btn">
      <a
        href={`https://wa.me/${project.Whatsapp_no}`} // replace with dynamic mobile
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp size={22} />
      </a>

      <a href={`tel:${project.Mobile}`} className="call-btn">
        <FaPhoneAlt size={22} />
      </a>
    </div>
  );
};

export default ContactBtn;
