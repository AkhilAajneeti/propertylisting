import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
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
export default function RealEstateTabs({projects}) {
  console.log("Projects in RealEstateTabs:", projects);
  const [value, setValue] = useState(0);
  // const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   // Example: set all projects initially (or filter based on some condition)
  //   setProjects(projectsData);
  // }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 const hotDeals = projects.filter((p) => p.is_featured);
  const limitedProjects = hotDeals.length ? hotDeals : projects.slice(0, 8);
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
                                <img src={project.Bann1 || project.Proj_Logo} alt={project.name} style={{ height: "264px" }}/>
                              </div>
                            </Link>
                          </div>
                          <div className="table p-3">
                            <div className="ele-1">
                              <h6 className="category text-info">
                                {project.projectbrand || "—"} | {project.Project_Location}
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
              autoplay={{ delay: 0, disableOnInteraction: false }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              speed={4000}
              freeMode={true}
              breakpoints={{
                0: {
                  slidesPerView: 1, // 👈 mobile (default)
                },
                768: {
                  slidesPerView: 2, // 👈 tablets
                },
                1024: {
                  slidesPerView: 3, // 👈 desktop
                },
              }}
              modules={[Pagination, Autoplay, EffectFade]}
              className="mySwiper-2"
            >
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Pune.png" alt="img" />
                          <img src="/Pune.png" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit!{" "}
                        </p>
                        <div className="pt-5">
                          <Link to="/Blog">Read</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Pune.png" alt="img" />
                          <img src="/Pune.png" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Lorem ipsum dolor sit amet consectetur.{" "}
                        </p>
                        <div className="pt-5">
                          <Link to="/Blog">Read</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Thumbnail.jpeg" alt="img" />
                          <img src="/Thumbnail.jpeg" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Lorem ipsum dolor sit, amet consectetur adipisicing.{" "}
                        </p>
                        <div className="pt-5">
                          <Link to="/Blog">Read</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Delhi.png" alt="img" />
                          <img src="/Delhi.png" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit{" "}
                        </p>
                        <div className="pt-5">
                          <Link to="/Blog">Read</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              speed={4000}
              freeMode={true}
              breakpoints={{
                0: {
                  slidesPerView: 1, // 👈 mobile (default)
                },
                768: {
                  slidesPerView: 2, // 👈 tablets
                },
                1024: {
                  slidesPerView: 3, // 👈 desktop
                },
              }}
              modules={[Pagination, Autoplay, EffectFade]}
              className="mySwiper-2"
            >
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Delhi.png" alt="img" />
                          <img src="/Delhi.png" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          project Media Institutional Real Estate{" "}
                        </p>
                        <div className="pt-5">
                          <a href="">More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Chennai.png" alt="img" />
                          <img src="/Chennai.png" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Indian REITs A Gateway to Institutional Real Estate{" "}
                        </p>
                        <div className="pt-5">
                          <a href="">More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Thumbnail.jpeg" alt="img" />
                          <img src="/Thumbnail.jpeg" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Indian REITs A Gateway to Institutional Real Estate{" "}
                        </p>
                        <div className="pt-5">
                          <a href="">More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cards-3 section-gray">
                  <div class="card card-blog">
                    <div class="card-image news-box-items">
                      <a href="#">
                        <div className="news-image ">
                          <img src="/Pune.png" alt="img" />
                          <img src="/Pune.png" alt="img" />
                        </div>
                        {/* <div class="card-caption">
                    
                          Quisque a bibendum magna
                        </div> */}
                      </a>
                      <div class="ripple-cont"></div>
                    </div>
                    <div class="table p-3">
                      <div className="ele-1">
                        <h6 class="category text-info">
                          September 2025 | Capital Market
                        </h6>
                        <p class="card-description fs-4">
                          Indian REITs A Gateway to Institutional Real Estate{" "}
                        </p>
                        <div className="pt-5">
                          <a href="">More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
