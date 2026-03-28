import React, { useState } from "react";

const C = {
  goldLight: "#e8c96a",
  gold: "#c9a84c",
  goldDark: "#8a6520",
  ink: "#0c0a07",
  inkSoft: "#2e2b24",
  muted: "#7a7265",
  cream: "#faf7f2",
  cardBg: "#ffffff",
  border: "#ede6d8",
};

const Brochure = ({ project, onOpen }) => {
  const [hovBtn, setHovBtn] = useState(false);

  const projectTitle = project?.Title || "Project Title";
  const cleanText = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || "";
  };

  const rawText = cleanText(project?.About_Content);

  const description = rawText
    ? rawText.split(".")[0].trim() + "."
    : "Explore this premium project with world-class amenities and RERA-approved compliance.";

  // const brochure = project?.Brochure || "#";

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "18px",
        background: C.cardBg,
        border: `1px solid ${C.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        padding: "26px 30px",
        overflow: "hidden",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "160px",
          height: "160px",
          background: `radial-gradient(circle at top right, rgba(232,201,106,0.07), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
        {/* Icon */}
        <div
          style={{
            width: "54px",
            height: "54px",
            flexShrink: 0,
            borderRadius: "13px",
            background: C.ink,
            border: `1px solid ${C.inkSoft}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(12,10,7,0.2)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2.5"
              stroke={C.gold}
              strokeWidth="1.5"
            />
            <path
              d="M7 8h10M7 12h10M7 16h6"
              stroke={C.gold}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              x="13"
              y="13"
              width="5"
              height="5"
              rx="1"
              fill="rgba(201,168,76,0.15)"
              stroke={C.goldLight}
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Tag */}
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: C.gold,
              fontFamily: "Arial, sans-serif",
              fontWeight: "700",
              marginBottom: "4px",
            }}
          >
            Brochure
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: C.ink,
              letterSpacing: "0.1px",
              marginBottom: "6px",
              lineHeight: 1.3,
            }}
          >
            {projectTitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "16px",
              color: C.muted,
              lineHeight: 1.7,
              marginBottom: "18px",
              maxWidth: "100%",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {description}
          </div>

          {/* Download Button */}
          <button
            onClick={onOpen}
            onMouseEnter={() => setHovBtn(true)}
            onMouseLeave={() => setHovBtn(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              background: hovBtn ? C.inkSoft : C.ink,
              color: C.goldLight,
              border: `1px solid ${C.goldDark}`,
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "Arial, sans-serif",
              textDecoration: "none",
              boxShadow: hovBtn
                ? "0 8px 24px rgba(12,10,7,0.22), 0 0 0 3px rgba(201,168,76,0.12)"
                : "0 3px 10px rgba(12,10,7,0.14)",
              transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
              transform: hovBtn ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v13M7 12l5 5 5-5M5 20h14"
                stroke={C.goldLight}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
