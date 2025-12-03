import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

import {
  FaRegUser,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRegNewspaper } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsById } from "../redux/slices/newsSlice";
const NewsDetailPage = () => {
  const { id } = useParams();
 const dispatch = useDispatch();
  const { currentNews: news, loading, error } = useSelector(
    (state) => state.news
  );

 useEffect(() => {
    dispatch(fetchNewsById({id}));
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!news) return null;

  return (
    <div>
      {/* Banner */}
      <div
        className="blog-detailBanner position-relative d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${news.banner || news.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <div className="overlay"></div>
        <div className="banner-content text-center text-white position-relative container">
          <h1 className="display-5 fw-bold">{news.title}</h1>
          <p className="fs-5 text-light text-center">{news.newscategory}</p>
        </div>
      </div>

      {/* News Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="glass-card p-5 rounded-4 shadow-lg">
              {/* Meta Info */}
              <div className="d-flex gap-4 text-muted small mb-4">
                <span>
                  <FaRegUser /> By {news.author}
                </span>
                <span>
                  <SlCalender /> {news.date ? new Date(news.date).toLocaleDateString("en-US") : "Date N/A"}
                </span>
                <span>
                  <FaRegNewspaper /> {news.newscategory}
                </span>
              </div>

              {/* HTML Content */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: news.content }}
              ></div>

              {/* Banner 2 */}
              {news.banner2 && (
                <div
                  className="post-featured-thumb bg-cover pt-3"
                  style={{
                    backgroundImage: `url(${news.banner2})`,
                    height: "350px",
                  }}
                ></div>
              )}

              {/* Share */}
              <div className="share-box mt-5 d-flex align-items-center gap-3">
                <h5 className="fw-bold">Share:</h5>
                <a className="share-btn" href="#"><FaFacebookF /></a>
                <a className="share-btn" href="#"><FaLinkedinIn /></a>
                <a className="share-btn" href="#"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
