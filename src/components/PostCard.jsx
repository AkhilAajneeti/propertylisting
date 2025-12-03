import React from "react";
import { Link } from "react-router-dom";
import { PiClockClockwiseLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const PostCard = React.memo(({ data }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-img-wrapper rounded-2 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="card-img-top"
          width="350"
          height="240"
          loading="lazy"
          style={{ objectFit: "cover" }}
          decoding="async"
        />
      </div>

      <div className="card-body">
        <div className="text-uppercase small text-muted fw-semibold mb-2">
          {data.blogcategory} • By {data.author}
        </div>

        <Link to={`/blog/${data.id}/${data.blogslug}`} className="text-dark">
          <h5 className="card-title fw-bold">{data.title}</h5>
        </Link>

        <p className="card-text text-muted">
          {data.content.replace(/<[^>]+>/g, "").slice(0, 120)}…
        </p>
      </div>

      <div className="card-footer bg-white border-0 d-flex justify-content-between text-muted small">
        <span><PiClockClockwiseLight /> 5 min read</span>
        <span><SlCalender /> {data.date}</span>
      </div>
    </div>
  );
});

export default PostCard;
