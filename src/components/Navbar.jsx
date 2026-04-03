import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import getProjectsByCategory from "../api/projectApi";
function CustomNavbar() {
  const [show, setShow] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMouseEnter = (menu) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setHoveredDropdown(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active-nav" : "nav-link";

  // fetch project category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getProjectsByCategory();
        setCategories(res.results || []);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const sortedCategories = [...categories].sort((a, b) => a.id - b.id);
  return (
    <>
      <Navbar bg="light" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/JV-Logo.png" alt="Logo" width="150" />
          </Navbar.Brand>

          <Navbar.Toggle onClick={handleShow} />

          <Navbar.Collapse className="d-none d-lg-flex justify-content-center">
            <Nav>
              <Nav.Link as={NavLink} to="/" className={navLinkClass}>
                HOME
              </Nav.Link>

              {/* ABOUT US */}
              <NavDropdown
                title="ABOUT US"
                show={hoveredDropdown === "about"}
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <NavDropdown.Item as={NavLink} to="/whoweare">
                  WHO WE ARE
                </NavDropdown.Item>
                <div className="dropdown-submenu">
                  <NavDropdown.Item
                    as={NavLink}
                    to="/our-team"
                    className="d-flex justify-content-between align-items-center"
                  >
                    OUR TEAM <span className="submenu-arrow">›</span>
                  </NavDropdown.Item>

                  <div className="submenu-dropdown">
                    <NavDropdown.Item as={NavLink} to="/our-team/ipo-advisory">
                      IPO Advisory
                    </NavDropdown.Item>
                  </div>
                </div>
                <NavDropdown.Item as={NavLink} to="/client-testimonial">
                  CLIENT TESTIMONIALS
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/aboutus/awards">
                  AWARDS & RECOGNITION
                </NavDropdown.Item>
              </NavDropdown>

              {/* PROJECT */}
              <NavDropdown
                title="PROJECT"
                show={hoveredDropdown === "project"}
                onMouseEnter={() => handleMouseEnter("project")}
                onMouseLeave={handleMouseLeave}
              >
                {sortedCategories.map((cat) => (
                  <NavDropdown.Item
                    key={cat.id}
                    as={NavLink}
                    to={{
                      pathname: "/projects",
                      search: `?category=${cat.slug}`,
                    }}
                  >
                    {cat.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {/* INSIGHTS */}
              <NavDropdown
                title="INSIGHTS"
                show={hoveredDropdown === "insights"}
                onMouseEnter={() => handleMouseEnter("insights")}
                onMouseLeave={handleMouseLeave}
              >
                <NavDropdown.Item as={NavLink} to="/insight/news&media">
                  NEWS MEDIA
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/blog">
                  BLOGS
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/career" className={navLinkClass}>
                CAREERS
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contact" className={navLinkClass}>
                CONTACT US
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="tel:+919999570772" className="call-btn2">
                <img src="/phone-call.png" alt="phone Button" />
                9999570772
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MOBILE OFFCANVAS */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Navbar.Brand as={Link} to="/" onClick={handleClose}>
            <img src="/JV-Logo.png" alt="Logo" width="150" />
          </Navbar.Brand>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column text-center">
            <Nav.Link as={NavLink} to="/" onClick={handleClose}>
              Home
            </Nav.Link>

            {/* ABOUT US */}
            <div className="mobile-accordion-item">
              <div
                className="mobile-accordion-title"
                onClick={() => {
                  if (activeMenu === "about") {
                    setActiveMenu(null);
                    setActiveSubMenu(null);
                  } else {
                    setActiveMenu("about");
                  }
                }}
              >
                ABOUT US
                <span className={activeMenu === "about" ? "rotate" : ""}>
                  ▼
                </span>
              </div>

              <div
                className={`mobile-accordion-content ${
                  activeMenu === "about" ? "open" : ""
                }`}
              >
                <NavLink to="/whoweare" onClick={handleClose}>
                  WHO WE ARE
                </NavLink>

                {/* OUR TEAM NESTED */}
                <div className="nested-accordion">
                  <NavLink
                    to="/our-team"
                    className="nested-accordion-title"
                    onClick={() => {
                      setActiveSubMenu(
                        activeSubMenu === "team" ? null : "team",
                      );
                      handleClose(); // if you want menu to close
                    }}
                  >
                    <span>OUR TEAM</span>

                    <span
                      className={`accordion-arrow ${
                        activeSubMenu === "team" ? "rotate-arrow" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </NavLink>

                  <div
                    className={`nested-accordion-content ${
                      activeSubMenu === "team" ? "open" : ""
                    }`}
                  >
                    <NavLink to="/our-team/ipo-advisory" onClick={handleClose}>
                      <FiChevronRight className="right-arrow" /> IPO Advisory
                    </NavLink>
                  </div>
                </div>

                <NavLink to="/client-testimonial" onClick={handleClose}>
                  CLIENT TESTIMONIALS
                </NavLink>

                <NavLink to="/aboutus/awards" onClick={handleClose}>
                  AWARDS & RECOGNITION
                </NavLink>
              </div>
            </div>

            {/* PROJECT */}
            <div className="mobile-accordion-item">
              <div
                className="mobile-accordion-title"
                onClick={() =>
                  setActiveMenu(activeMenu === "project" ? null : "project")
                }
              >
                PROJECT
                <span className={activeMenu === "project" ? "rotate" : "▼"}>
                  ▼
                </span>
              </div>

              <div
                className={`mobile-accordion-content ${
                  activeMenu === "project" ? "open" : ""
                }`}
              >
                {sortedCategories.length === 0 ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  sortedCategories.map((cat) => (
                    <NavLink
                      key={cat.id}
                      to={{
                        pathname: "/projects",
                        search: `?category=${cat.slug}`,
                      }}
                      onClick={handleClose}
                    >
                      {cat.name}
                    </NavLink>
                  ))
                )}
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="mobile-accordion-item">
              <div
                className="mobile-accordion-title"
                onClick={() =>
                  setActiveMenu(activeMenu === "insights" ? null : "insights")
                }
              >
                INSIGHTS
                <span className={activeMenu === "insights" ? "rotate" : ""}>
                  ▼
                </span>
              </div>

              <div
                className={`mobile-accordion-content ${
                  activeMenu === "insights" ? "open" : ""
                }`}
              >
                <NavLink to="/insight/news&media" onClick={handleClose}>
                  NEWS MEDIA
                </NavLink>

                <NavLink to="/blog" onClick={handleClose}>
                  BLOGS
                </NavLink>
              </div>
            </div>

            <Nav.Link
              className="mobMenu"
              as={NavLink}
              to="/career"
              onClick={handleClose}
            >
              CAREERS
            </Nav.Link>

            <Nav.Link
              className="mobMenu"
              as={NavLink}
              to="/contact"
              onClick={handleClose}
            >
              CONTACT US
            </Nav.Link>

            <Nav className="mobile_button mt-3 d-flex justify-content-center">
              <Nav.Link href="tel:+919999570772" className="call-btn2">
                <img src="/phone-call.png" alt="phone Button" />
                9999570772
              </Nav.Link>
            </Nav>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CustomNavbar;
