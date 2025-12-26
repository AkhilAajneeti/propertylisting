import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const TestimonialCard = React.memo(({ item }) => (
  <div className="card shadow-sm border-1 p-4 rounded-3" style={{ borderColor: "#e94b35" }}>
    <div className="mb-2 text-warning">
      {Array.from({ length: 5 }, (_, i) =>
        i < item.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </div>

    <p className="fst-italic text-secondary fw-semibold">
      “{item.content}”
    </p>

    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="d-flex align-items-center">
        <img
          src={item.image || "/user.png"}
          alt={item.name}
          width="70"
          height="70"
          className="rounded-circle me-3"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h6 className="mb-0 fw-bold text-dark">{item.name}</h6>
          <small className="text-muted">{item.designation}</small>
        </div>
      </div>

      <img
        width="50"
        height="50"
        src="/straight-quotes.png"
        alt="quotes"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
));

export default TestimonialCard;
