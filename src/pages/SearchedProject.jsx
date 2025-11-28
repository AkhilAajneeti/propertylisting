import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchSearchProjects } from "../redux/slices/propertySlice";
import AOS from "aos";
import "aos/dist/aos.css";
const SearchedProject = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search).get("q");

  const { searchResults, loading, error } = useSelector(
    (state) => state.projects
  );
  useEffect(() => {
    AOS.init({
      duration: 1200, // default duration
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);

  // Fetch search results
  useEffect(() => {
    if (query) {
      dispatch(fetchSearchProjects(query));
    }
  }, [query, dispatch]);
  if (loading) return <Loader />;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <>
      <div className="BlogBanner">
        <h1 className=" " data-aos="fade-up">
          Searched Projects
        </h1>
      </div>
      <div className="container py-5">
        <h2 className="mb-4">
          Search Results for: <strong>{query}</strong>
        </h2>

        <div className="row gy-5">
          {searchResults.length > 0 ? (
            searchResults.map((project,index) => (
              <div className="col-sm-4" key={project.id}>
                <div className="cards-3 section-gray" data-aos="fade-up" data-aos-delay={index * 150} >
                  <div className="card card-blog">
                    <div className="card-image news-box-items">
                      <Link to={`/projects/${project.id}`}>
                        <img
                          src={project.Bann1 || project.Proj_Logo}
                          alt={project.Title}
                          style={{
                            height: "264px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </div>

                    <div className="table p-3">
                      <h6 className="category text-info">
                        {project.City}
                        {project.Project_Location
                          ? ` | ${project.Project_Location}`
                          : ""}
                      </h6>

                      <Link
                        to={`/projects/${project.id}`}
                        className="text-dark text-decoration-none"
                      >
                        <p className="fs-4">{project.Title}</p>
                      </Link>

                      <p className="fw-bold">{project.Price}</p>

                      <Link
                        to={`/projects/${project.id}`}
                        className="text-primary fw-semibold"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-5">No Projects Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchedProject;
