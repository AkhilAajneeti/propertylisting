import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SolutionsSection = () => {
  const [activeImage, setActiveImage] = useState("/start-image.png"); // default image

  const tabs = [
    { label: "Developers", img: "/start-image.png" },
    { label: "Channel Partners", img: "/channelpartner.png" },
    { label: "Corporates", img: "/01.jpg" },
    { label: "Consumers", img: "/02.jpg" },
  ];

  return (
    <div className="my-5" style={{ backgroundColor: "#e9f2fa" }}>
      <div className="container ">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-md-8 text-center text-md-start">
            <h2 className="fw-bold mb-4 mainFont">
              Collaborating to Offer <br /> Customised Solutions
            </h2>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              {tabs.map((tab, i) => (
                <div key={i} className="px-4 py-2 bg-white border rounded cursor-pointer"
                  style={{
                    minWidth: "150px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setActiveImage(tab.img)}
                >
                  {tab.label} 
                  
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-4 text-center mt-4 mt-md-0 d-flex justify-content-end">
            <img
              src={activeImage}
              alt="Solution"
              className="img-fluid"
              style={{ maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;
