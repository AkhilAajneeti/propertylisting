import React, { useState } from "react";

const FloorPlan = ({ plans = [], images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultImage = "/floor-plan-img.png";

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="floorplan-container">
      <h2 className="floorplan-title">Floor Plan</h2>

      <div className="floorplan-content">
        {/* LEFT IMAGE */}
        <div className="floorplan-image">
          <img
            src={images[activeIndex] || defaultImage}
            alt="floor plan"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>

        {/* RIGHT TABS */}
        <div className="floorplan-tabs">
          <div
            className="tab-buttons"
            style={{
              display: "flex",
              overflowX: plans.length > 3 ? "auto" : "visible",
              gap: "10px",
              paddingBottom: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {plans.length > 0 ? (
              plans.map((plan, index) => (
                <button
                  key={index}
                  className={`tab-btn ${activeIndex === index ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}
                >
                  {plan}
                </button>
              ))
            ) : (
              <p>No Floor Plans Available</p>
            )}
          </div>

          <div className="tab-content">
            {plans.length > 0 && (
              <div className="tab">
                <p>
                  Showing floor plan details for:{" "}
                  <strong>{plans[activeIndex]}</strong>
                </p>
                {/* Size */}
                {/* {plans[activeIndex]?.Size && (
                  <p>
                    <span className="fw-bold">Size:</span>{" "}
                    {plans[activeIndex].Size}
                  </p>
                )} */}
                {/* Size */}
                {/* {plans[activeIndex]?.Price && (
                  <p>
                    <span className="fw-bold">Price:</span>{" "}
                    {plans[activeIndex].Price}
                  </p>
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
