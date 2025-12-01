import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const DetailPageNavbar = ({ project }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [expanded, setExpanded] = useState(false);

  const sections = [
    "Overview",
    "Highlight",
    "Ameneties",
    "Floorplan",
    "Location",
    "Developer",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight =
        document.querySelector(".ProjectBanner")?.offsetHeight || 0;

      setIsSticky(window.scrollY >= bannerHeight);

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setExpanded(false); // close menu on click
  };

  return (
    <Navbar
      expand="lg"
      className={`detail-navbar ${isSticky ? "sticky" : ""}`}
      expanded={expanded}
    >
      <Container>
        <img
          src={project.Proj_Logo}
          alt={project.Proj_Logo}
          className="projectLogo"
          style={{ mixBlendMode: project.transparent ? "normal" : "multiply" }}
        />
        <Navbar.Toggle
          aria-controls="detail-nav"
          onClick={() => setExpanded(expanded ? false : true)}
          className="hamburger-btn"
        />

        <Navbar.Collapse id="detail-nav" className="menu-collapse">
          <Nav className="mx-auto gap-3">
            {sections.map((sec) => (
              <Nav.Link
                key={sec}
                onClick={() => handleSmoothScroll(sec)}
                className={activeSection === sec ? "active-nav-link" : ""}
                style={{ cursor: "pointer" }}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <a href="/">
          <img
            src="/JV-Logo.png"
            alt="/JV-Logo.png"
            className="projectLogo d-none d-md-block"
          />
        </a>
      </Container>
    </Navbar>
  );
};

export default DetailPageNavbar;
