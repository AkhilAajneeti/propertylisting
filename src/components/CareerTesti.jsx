import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaDribbble,
} from "react-icons/fa";
const CareerTesti = ({ image, name, role, description }) => {
  return (
    <div>
      <div className="CareerTestimonial card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src={image} alt={name} />
          </div>

          {/* Visible by default (name only) */}
          <div className="details2">
            <h2>
              {name}
              <br />
              <span className="job-title text-light">{role}</span>
            </h2>
          </div>

          {/* Appears on hover with animation */}
          <div className="details">
            <h2>
              {name}
              <br />
              <span className="job-title">
                {description}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTesti;
