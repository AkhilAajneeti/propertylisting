import { useEffect } from "react";
import { PiClockClockwiseLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
gsap.registerPlugin(ScrollTrigger, SplitText);

const Blog = () => {
  const dispatch = useDispatch();
  const { data: blogs=[], loading, error } = useSelector((state) => state.blogs);

  // Fetch blogs
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch]);

  useEffect(() => {
    gsap.from(".blog-list .blog-card", {
      opacity: 1,
      y: 0,
      stagger: 0.2, // delay between cards
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".blog-list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    //
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
        }
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
  }, []);
  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;
  return (
    <div>
      <div className="BlogBanner">
        <h1 className="text-drop__line ">Blogs</h1>
      </div>
      <div className="container py-4">
        <div className="row gx-5">
          {/* Left Featured Blog */}
          <div className="col-lg-8">
            <div className="mb-2 mt-4">
              <div className="blog-list row g-4">
                {blogs.map((blog) => (
                  <div className="col-lg-6 col-md-6 blog-card" key={blog.id}>
                    <div className="card shadow-sm border-0">
                      <div className="card-img-wrapper rounded-2 overflow-hidden">
                        <img
                          src={blog.image}
                          className="card-img-top"
                          alt={blog.title}
                        />
                      </div>
                      <div className="card-body">
                        <div className="text-uppercase small text-muted fw-semibold mb-2">
                          {blog.blogcategory} | Author – {blog.author}
                        </div>

                        <Link to={`/blog/${blog.id}/${blog.blogslug}`}>
                          <h5 className="card-title fw-bold">{blog.title}</h5>
                        </Link>

                        <p className="card-text text-muted">
                          {blog.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                          ...
                        </p>
                      </div>

                      <div className="card-footer bg-white border-0 d-flex justify-content-between text-muted small">
                        <span>
                          <PiClockClockwiseLight /> 5 min read
                        </span>
                        <span>
                          <SlCalender /> {blog.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="spacer-single"></div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="widget widget-post sticky-top">
              <h4 className="text-drop__line">Recent Posts</h4>
              <ul className="de-post-type-1">
                <li className="d-flex blog-card">
                  <div className="d-image">
                    <img src="/02.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="d-content">
                    <a href="#">
                      <h5>Exploring the Rise of Unique and Lifestyle Hotels</h5>
                    </a>
                    <div className="d-date">
                      <SlCalender /> January 15, 2023
                    </div>
                  </div>
                </li>
                <li className="d-flex blog-card">
                  <div className="d-image">
                    <img src="/01.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="d-content">
                    <a href="#">
                      <h5>
                        Hotels are Adapting to Modern Traveler Preferences
                      </h5>
                    </a>
                    <div className="d-date">
                      <SlCalender /> January 15, 2023
                    </div>
                  </div>
                </li>
                <li className="d-flex blog-card">
                  <div className="d-image">
                    <img src="/02.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="d-content">
                    <a href="#">
                      <h5>
                        Innovative Marketing Strategies for Boutique Hotels
                      </h5>
                    </a>
                    <div className="d-date">
                      <SlCalender /> January 15, 2023
                    </div>
                  </div>
                </li>
                <li className="d-flex blog-card">
                  <div className="d-image">
                    <img src="/01.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="d-content">
                    <a href="#">
                      <h5>Transforming Common Spaces in Modern Hotels</h5>
                    </a>
                    <div className="d-date">
                      <SlCalender /> January 15, 2023
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
