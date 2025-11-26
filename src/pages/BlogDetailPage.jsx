import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaRegUser,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegNewspaper } from "react-icons/fa6";
import { getBlogById } from "../api/blogApi";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogById(id)
      .then((data) => setBlog(data))
      .catch((err) => console.log("Error fetching blog details:", err));
  }, [id]);

  if (!blog) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      {/* Banner */}
      <div
        className="blog-detailBanner position-relative d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${blog.banner || blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <div className="overlay"></div>
        <div className="banner-content text-center text-white position-relative container">
          <h1 className="display-5 fw-bold">{blog.title}</h1>
          <p className="fs-5 text-light text-center">{blog.blogcategory}</p>
        </div>
      </div>

      {/* Blog container */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="glass-card p-5 rounded-4 shadow-lg">
              {/* Meta */}
              <div className="d-flex gap-4 text-muted small mb-4">
                <span>
                  <FaRegUser /> By {blog.author}
                </span>
                <span>
                  <SlCalender />{" "}
                  {new Date(blog.date).toLocaleDateString("en-US")}
                </span>
                <span>
                  <FaRegNewspaper /> {blog.blogcategory}
                </span>
              </div>

              {/* Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
              {blog.banner2 && (
                <div
                  className="post-featured-thumb bg-cover my-5"
                  style={{
                    backgroundImage: `url(${blog.banner2})`,
                    height: "350px",
                  }}
                ></div>
              )}
              {/* Share */}
              <div className="share-box mt-5 d-flex align-items-center gap-3">
                <h5 className="fw-bold">Share:</h5>
                <a className="share-btn">
                  <FaFacebookF />
                </a>
                <a className="share-btn">
                  <FaLinkedinIn />
                </a>
                <a className="share-btn">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
