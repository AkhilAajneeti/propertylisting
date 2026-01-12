import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = React.memo(({ project }) => {
  return (
    <div className="cards-3 section-gray">
      <div className="card card-blog">
        <div className="card-image news-box-items">
          <Link to={`/projects/${project.id}/${project.project_slug}`}>
            <div className="news-image">
              <img
                src={project.Bann1 || project.Proj_Logo}
                alt={project.Title}
                width="350"
                height="264"
                loading="lazy"
                style={{ objectFit: "cover" }}
                decoding="async"
              />
            </div>
          </Link>
        </div>

        <div className="table p-3 ele-1">
          <h6 className="category text-info">
            {project.City || project.projectbrand || "—"}
            {project.Project_Location ? ` | ${project.Project_Location}` : ""}
          </h6>

          <Link
            to={`/projects/${project.id}/${project.project_slug}`}
            style={{ textDecoration: "none" }}
          >
            <h4 className="card-description fs-4">{project.Title}</h4>
            <p className="card-price fs-4 mb-0">
              {" "}
              <img src="/rupee.png" alt="" className="project_param" />
              {project.Price}
            </p>
            <p className="card-config">
              <img src="/stack.png" alt="" className="project_param" />
              {project.Configuration?.length
                ? project.Configuration.join(", ")
                : "Configuration not available"}
            </p>
          </Link>
          <div className="projectBtn">
            <Link to={`/projects/${project.id}/${project.project_slug}`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
