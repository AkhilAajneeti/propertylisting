import React, { useEffect, useState } from "react";
import { FaBriefcase, FaRegBuilding } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getJobs } from "../api/jobApi";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [filters, setFilters] = useState({
    location: "All Locations",
    jobType: "All Job Types",
  });

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((err) => console.log("Error fetching jobs:", err));
  }, []);

  // Create dynamic dropdown values
  const Location = [
    "All Locations",
    ...new Set(jobs.map((job) => job.location).filter(Boolean)),
  ];

  const JobTypes = ["All Job Types", "Full Time", "Part Time", "Internship"];

  // Apply filters
  useEffect(() => {
    const result = jobs.filter((job) => {
      const matchLocation =
        filters.location === "All Locations" ||
        job.location === filters.location;

      const matchType =
        filters.jobType === "All Job Types" || job.type === filters.jobType;

      return matchLocation && matchType;
    });

    setFilteredJobs(result);
  }, [filters, jobs]);

  return (
    <section className="job-section">
      <div className="filter-bar">
        <h2 className="filter-title">Filter By</h2>

        <div className="filter-controls">
          <div className="filter-select">
            <select
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              {Location.map((loc, i) => (
                <option key={i}>{loc}</option>
              ))}
            </select>
            <FaLocationDot className="select-icon" />
          </div>

          <div className="filter-select">
            <select
              value={filters.jobType}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
            >
              {JobTypes.map((type, i) => (
                <option key={i}>{type}</option>
              ))}
            </select>
            <FaBriefcase className="select-icon" />
          </div>
        </div>

        <button className="search-btn">
          Search &nbsp;
          <CiSearch />
        </button>
      </div>

      <h3 className="job-count">
        {filteredJobs.length} Open Position
        {filteredJobs.length !== 1 ? "s" : ""}
      </h3>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, i) => (
            <div key={i} className="job-item">
              <div className="job-info">
                <h4 className="job-title">{job.title}</h4>
                <p className="job-meta">
                  <span>◆ Rs. {job.salary}</span><br />
                  <span>◆ {job.location}</span>
                </p>
              </div>
              <Link className="apply-btn" to={`/job/${job.id}`}>
                Apply Now
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No jobs found for the selected filters.</p>
        )}
      </div>
    </section>
  );
};

export default JobSection;
