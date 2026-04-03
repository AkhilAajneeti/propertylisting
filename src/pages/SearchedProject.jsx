import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchSearchProjects } from "../redux/slices/propertySlice";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../components/seo/SEO";
import ProjectCard from "../components/ProjectCard";
const SearchedProject = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search).get("q");

  const { searchResults, loading, error } = useSelector(
    (state) => state.projects,
  );
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });

    return () => AOS.refreshHard(); // 🧹 cleanup when component unmounts
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
      <SEO
        title={`Search Results for "${query}" | Jenika Ventures`}
        description={`Showing property results for "${query}". Explore residential and commercial projects in Delhi NCR.`}
      />
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
          {searchResults?.length > 0 ? (
            searchResults.map((project) => (
              <div className="col-sm-4" key={project.id}>
                <ProjectCard project={project} />
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
