import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { fetchNews } from "../redux/slices/newsSlice";
import Loader from "./Loader";
import ProjectCard from "./ProjectCard";
import PostCard from "./PostCard";
import NewsCard from "./NewsCard";
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
  const {
    data: blogs = [],
    loading,
    error,
  } = useSelector((state) => state.blogs);
  const { data: News } = useSelector((state) => state.news);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Fetch blogs
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs]);
  //new Fetch
  useEffect(() => {
    if (!News || News.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, News]);
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
              loop={limitedProjects.length > 3}
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
                      <ProjectCard project={project} />
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
              loop={limitedBlogs.length > 3}
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
                  <PostCard data={b} />
                </SwiperSlide>
              ))}
            </Swiper>
          </CustomTabPanel>
          {/* ➤ MEDIA (NEWS) TAB */}
          <CustomTabPanel value={value} index={2}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={limitedNews.length > 3}
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
                  <NewsCard data={n} />
                </SwiperSlide>
              ))}
            </Swiper>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
