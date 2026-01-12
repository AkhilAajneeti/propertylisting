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
            <p className="card-price fs-4">{project.Price}</p>
            <p className="card-price fs-4">{project.Configuration}</p>
          </Link>

          <div className="pt-4">
            <div class="tg-button-wrap">
              <Link
                to={`/projects/${project.id}/${project.project_slug}`}
                class="btn border-white"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
