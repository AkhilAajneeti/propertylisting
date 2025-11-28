import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PiClockClockwiseLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { fetchNews } from "../redux/slices/newsSlice";
// import projectsData from "../assets/properties.json"; // import mock data

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function RealEstateTabs({ projects }) {
  const dispatch = useDispatch();
  const { data: blogs=[], loading, error } = useSelector((state) => state.blogs);
  const { data: News } = useSelector((state) => state.news);
  console.log("Projects in RealEstateTabs:", projects);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// Fetch blogs
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch,blogs]);
   useEffect(() => {
     dispatch(fetchNews());
   }, [dispatch]);
  const hotDeals = projects.filter((p) => p.is_featured);
  const limitedProjects = hotDeals.length ? hotDeals : projects.slice(0, 8);
  const limitedBlogs = blogs.slice(0, 8);
  const limitedNews = News.slice(0, 8);
  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;
  return (
    <>
      <div className="container pt-5">
        <Box sx={{ width: "100%" }}>
          <h2 className="pt-5 mainFont text-center text-md-start">
            Latest in Real Estate
          </h2>
          {/* Tab Header */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Hot Deals" {...a11yProps(0)} />
              <Tab label="Blog" {...a11yProps(1)} />
              <Tab label="Media" {...a11yProps(2)} />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <CustomTabPanel value={value} index={0}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{ delay: 0, disableOnInteraction: true }}
              pagination={{ clickable: true }}
              navigation={false}
              loop={true}
              speed={4000}
              freeMode={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Pagination, Autoplay, EffectFade]}
              className="mySwiper-2"
            >
              {limitedProjects.length > 0 ? (
                limitedProjects.map(
                  (
                    project // 👈 Only top 5 projects
                  ) => (
                    <SwiperSlide key={project.id}>
                      <div className="cards-3 section-gray">
                        <div className="card card-blog">
                          <div className="card-image news-box-items">
                            <Link to={`/projects/${project.id}`}>
                              <div className="news-image">
                                <img
                                  src={project.Bann1 || project.Proj_Logo}
                                  alt={project.name}
                                  style={{ height: "264px" }}
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="table p-3">
                            <div className="ele-1">
                              <h6 className="category text-info">
                                {project.projectbrand || "—"} |{" "}
                                {project.Project_Location}
                              </h6>
                              <Link
                                to={`/projects/${project.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <p className="card-description fs-4">
                                  {project.Title}
                                </p>
                                <p className="card-description fs-4">
                                  {project.Price}
                                </p>
                              </Link>
                              <div className="pt-4">
                                <Link to={`/projects/${project.id}`}>
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )
              ) : (
                <p className="text-center">No projects found</p>
              )}
            </Swiper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              autoplay={{ delay: 0 }}
              speed={4000}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {limitedBlogs.map((b) => (
                <SwiperSlide key={b.id}>
                  <div className="card shadow-sm border-0">
                    <div className="card-img-wrapper rounded-2 overflow-hidden">
                      <img
                        src={b.image}
                        className="card-img-top"
                        alt={b.title}
                      />
                    </div>
                    <div className="card-body">
                      <div className="text-uppercase small text-muted fw-semibold mb-2">
                        {b.blogcategory} | Author – {b.author}
                      </div>

                      <Link to={`/blog/${b.id}/${b.blogslug}`}>
                        <h5 className="card-title fw-bold">{b.title}</h5>
                      </Link>

                      <p className="card-text text-muted">
                        {b.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                        ...
                      </p>
                    </div>

                    <div className="card-footer bg-white border-0 d-flex justify-content-between text-muted small">
                      <span>
                        <PiClockClockwiseLight /> 5 min read
                      </span>
                      <span>
                        <SlCalender /> {b.date}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </CustomTabPanel>
          {/* ➤ MEDIA (NEWS) TAB */}
          <CustomTabPanel value={value} index={2}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              autoplay={{ delay: 0 }}
              speed={4000}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {limitedNews.map((n) => (
                <SwiperSlide key={n.id}>
                  <div className="card shadow-sm border-0">
                    <div className="card-img-wrapper rounded-2 overflow-hidden">
                      <img
                        src={n.image}
                        className="card-img-top"
                        alt={n.title}
                      />
                    </div>
                    <div className="card-body">
                      <div className="text-uppercase small text-muted fw-semibold mb-2">
                        {n.blogcategory} | Author – {n.author}
                      </div>

                      <Link to={`/blog/${n.id}/${n.blogslug}`}>
                        <h5 className="card-title fw-bold">{n.title}</h5>
                      </Link>

                      <p className="card-text text-muted">
                        {n.content.replace(/<[^>]+>/g, "").slice(0, 120)}
                        ...
                      </p>
                    </div>

                    <div className="card-footer bg-white border-0 d-flex justify-content-between text-muted small">
                      <span>
                        <PiClockClockwiseLight /> 5 min read
                      </span>
                      <span>
                        <SlCalender /> {n.date}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
