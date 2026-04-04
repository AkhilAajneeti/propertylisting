import { useEffect, useState } from "react";

import { SlCalender } from "react-icons/sl";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import SEO from "../components/seo/SEO";
gsap.registerPlugin(ScrollTrigger, SplitText);

const Blog = () => {
  const dispatch = useDispatch();
  const {
    data: blogs = [],
    loading,
    error,
  } = useSelector((state) => state.blogs);

  // Fetch blogs
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);
  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;

  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    // --- TEXT ANIMATION ---
    gsap.utils.toArray(".text-drop__line").forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1, // slight stagger
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    //
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".split").forEach((el) => {
        let split = new SplitText(el, {
          type: "words,lines",
          linesClass: "line",
        });

        gsap.from(split.lines, {
          scrollTrigger: {
            trigger: el, // 👈 har element ka trigger usi pe hoga
            start: "top 80%", // jab ~80% viewport me aayega tab chalega
            toggleActions: "play none none none",
          },
          duration: 0.1,
          yPercent: 100,
          opacity: 0,
          stagger: 0.3,
          ease: "expo.out",
        });
      });
    });

    return () => ctx.revert(); // cleanup on unmount
  }, [blogs]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);


  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;
  return (
    <div>
      <SEO
        title="Real Estate Blog | Property Investment Tips & Insights - Jenika Ventures"
        description="Explore expert blogs on real estate, property investment tips, market trends, and buying guides. Stay updated with the latest insights on residential and commercial properties in Delhi NCR."
      />
      <div className="BlogBanner">
        <h1 className="text-drop__line ">Blogs</h1>
      </div>
      <div className="container py-4">
        <div className="row gx-5">
          {/* Left Featured Blog */}
          <div className="col-lg-8">
            <div className="mb-2 mt-4">
              <div className="blog-list row g-4">
                <div className="blog-list row g-4">
                  {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                      <div
                        className="col-lg-6 col-md-6 blog-card"
                        key={blog.id}
                      >
                        <PostCard data={blog} />
                      </div>
                    ))
                  ) : (
                    <p className="text-center mt-5 w-100">
                      {blogs.length === 0
                        ? "No blogs available at the moment."
                        : "No blogs found."}
                    </p>
                  )}
                </div>
              </div>
              {/* pagination */}
              {filteredBlogs.length > blogsPerPage ? (
                <div className="pagination justify-content-center pt-5 gap-2">
                  <button
                    disabled={currentPage === 1}
                    className={`next-btn ${
                      currentPage === 1 ? "disabled" : "active-nav-btn"
                    }`}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Prev
                  </button>

                  {Array.from(
                    { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`numberbutton ${
                          currentPage === i + 1 ? "active-page" : ""
                        }`}
                      >
                        {i + 1}
                      </button>
                    ),
                  )}

                  <button
                    disabled={
                      currentPage ===
                      Math.ceil(filteredBlogs.length / blogsPerPage)
                    }
                    className={`next-btn ${
                      currentPage ===
                      Math.ceil(filteredBlogs.length / blogsPerPage)
                        ? "disabled"
                        : "active-nav-btn"
                    }`}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="spacer-single"></div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="widget widget-post sticky-top">
              <h4 className="text-drop__line">Recent Posts</h4>
              <ul className="de-post-type-1">
                {blogs.slice(0, 4).map((blog) => (
                  <li className="d-flex blog-card" key={blog.id}>
                    <div className="d-image">
                      <img
                        src={blog.image || blog.Blog_Thumbnail}
                        alt={blog.title}
                        className="img-fluid"
                        loading="lazy"
                        style={{ height: "80%" }}
                      />
                    </div>

                    <div className="d-content">
                      <a href={`/blog/${blog.blogslug}`}>
                        <h5>{blog.title}</h5>
                      </a>

                      <div className="d-date">
                        <SlCalender /> {blog.date || blog.created_at}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
