import React from "react";

const ProjectBanner = () => {
  return (
    <div className="container my-100 ">
      <div className="row align-items-center justify-content-end rounded-4 overflow-hidden banner-row">
        {/* Right side - text and button */}
        <div className="col-md-6 d-flex flex-column justify-content-end text-white p-70">
          <h2 className="fw-bold mb-3 mainFont">
            Looking to buy your <br /> dream home?
          </h2>
          <p className="mb-4">Explore our exclusive projects</p>
          <div class="tg-button-wrap">
            <a class="btn-with-icon" href="about.html">
              <span class="btn btn-five">
                Collaborate with us
                <img src="/arrow (2).png" alt="" height={"30px"} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBanner;
