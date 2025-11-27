import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaRegUser,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegNewspaper } from "react-icons/fa6";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../redux/slices/blogSlice";
import AOS from "aos";
import "aos/dist/aos.css";
const BlogDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { blogDetail: blog, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchBlogById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (blog?.title) {
      document.title = blog.title + " — Blog";
    }
  }, [blog]);
useEffect(() => {
      AOS.init({
        duration: 1200, // default duration
        once: true, // whether animation should happen only once
        easing: "ease-in-out",
      });
    }, []);
  if (loading || !blog) return <Loader />;

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
          <h1 className="display-5 fw-bold" data-aos="fade-up">{blog.title}</h1>
          <p className="fs-5 text-light text-center" data-aos="fade-up">{blog.blogcategory}</p>
        </div>
      </div>

      {/* Blog container */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            {/* Meta */}
            <div className="d-flex gap-4 text-muted small mb-4">
              <span>
                <FaRegUser /> By {blog.author}
              </span>
              <span>
                <SlCalender /> {new Date(blog.date).toLocaleDateString("en-US")}
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
              <img
                src={blog.banner2}
                className="img-fluid rounded-3 my-4"
                alt="featured"
              />
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
  );
};

export default BlogDetailPage;
