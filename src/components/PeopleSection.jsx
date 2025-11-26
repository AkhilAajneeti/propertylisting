import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PeopleSection = () => {
  return (
    <section className="py-5">
      <div className="container text-center">
        {/* Heading */}
        <h2 className="fw-bold">Our People Drive Our Success</h2>
        <p className="text-muted mb-5">
          We have fostered a culture that empowers our team.
        </p>

        {/* Cards Grid */}
        <div className="row g-4 justify-content-center">
          {/* Card 1 */}
          <div className="col-md-2 col-sm-6">
            <div
              className="p-3 p-xl-4 h-100  d-flex justify-content-between flex-column align-items-start"
              style={{ backgroundColor: "#fce7f3" }}
            >
              <h6 className="fw-semibold mb-3 text-start mainFont-2">
                Great work requires collaboration
              </h6>
              <div>
                <h2 className="fw-bold">2200+</h2>
                <p className="mb-0">Professionals</p>
              </div>
            </div>
          </div>

          {/* Video 1 */}
          <div className="col-md-3 col-sm-6">
            <div className="ratio ratio-16x9  overflow-hidden" style={{height:"100%"}}>
              <iframe
                src="https://www.youtube.com/embed/Scxs7L0vhZ4"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-2 col-sm-6">
            <div
              className="pt-4 h-100 "
              style={{ backgroundColor: "#dbeafe" }}
            >
              <h6 className="fw-semibold mb-3 mainFont-2">Different but Equal</h6>
              <img
                src="/pencile-bg.png"
                alt="Different but Equal"
                className="img-fluid rounded pt-34"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-2 col-sm-6">
            <div
              className="p-3 h-100   d-flex justify-content-between flex-column"
              style={{ backgroundColor: "#d1fae5" }}
            >
              <h6 className="fw-semibold mb-3 text-start mainFont-2">
                Empowering careers, building futures
              </h6>
              <button className="btn btn-warning fw-bold">
                Join us <span className="ms-1">›</span>
              </button>
            </div>
          </div>

          {/* Video 2 */}
          <div className="col-md-3 col-sm-6">
            <div className="ratio ratio-4x3  overflow-hidden" style={{height:"100%"}}>
              <iframe
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
