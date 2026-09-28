import React, { useEffect, useMemo, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import getProjectsByCategory from "../api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/propertySlice";
function CustomNavbar() {
  const [show, setShow] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: projects = [] } = useSelector((state) => state.projects);
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

  // Only once the PROJECT menu is actually opened - this component is on
  // every page and the full project list is several paginated requests.
  const projectMenuOpen =
    hoveredDropdown === "project" || activeMenu === "project";
  useEffect(() => {
    if (projectMenuOpen && projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [projectMenuOpen, dispatch]);

  // No /cities/ endpoint exists, so cities come from the projects.
  const cities = useMemo(() => {
    const counts = new Map();
    (projects || []).forEach((p) => {
      const city = (p.City || "").trim();
      if (city) counts.set(city, (counts.get(city) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [projects]);
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
                className="project-menu"
                show={hoveredDropdown === "project"}
                onMouseEnter={() => handleMouseEnter("project")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  // Only the toggle itself - the category links inside the
                  // menu must keep their own destinations. Matching the
                  // element also covers keyboard Enter, which fires a click
                  // targeted at the toggle.
                  if (e.target.closest(".dropdown-toggle")) {
                    e.preventDefault();
                    setHoveredDropdown(null);
                    navigate("/projects");
                  }
                }}
              >
                {/* Two columns side by side - no hover-to-expand, both lists
                    are visible as soon as the menu opens. */}
                <div className="project-mega">
                  <div className="project-mega__col">
                    <div className="project-mega__head">Property Type</div>

                    {sortedCategories.length === 0 ? (
                      <div className="project-mega__loading">Loading...</div>
                    ) : (
                      sortedCategories.map((cat) => (
                        <NavDropdown.Item
                          key={cat.id}
                          as={NavLink}
                          className="project-mega__item"
                          to={{
                            pathname: "/projects",
                            search: `?category=${cat.slug}`,
                          }}
                        >
                          {cat.name}
                        </NavDropdown.Item>
                      ))
                    )}
                  </div>

                  <div className="project-mega__col">
                    <div className="project-mega__head">Location</div>

                    {cities.length === 0 ? (
                      <div className="project-mega__loading">Loading...</div>
                    ) : (
                      cities.map((c) => (
                        <NavDropdown.Item
                          key={c.name}
                          as={NavLink}
                          className="project-mega__item"
                          to={`/search-projects?q=${encodeURIComponent(c.name)}`}
                        >
                          <span>{c.name}</span>
                          <span className="project-mega__count">{c.count}</span>
                        </NavDropdown.Item>
                      ))
                    )}
                  </div>
                </div>
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

        {/* data-lenis-prevent: Lenis smooth-scroll (App.jsx) intercepts
            touch and wheel across the document, so a nested scroll area
            has to opt out or it cannot be scrolled at all. */}
        <Offcanvas.Body data-lenis-prevent>
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
                className={`mobile-accordion-content ${activeMenu === "about" ? "open" : ""
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
                    onClick={handleClose}
                  >
                    <span>OUR TEAM</span>

                    <span
                      className={`accordion-arrow ${activeSubMenu === "team" ? "rotate-arrow" : ""
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveSubMenu(
                          activeSubMenu === "team" ? null : "team",
                        );
                      }}
                    >
                      ▼
                    </span>
                  </NavLink>

                  <div
                    className={`nested-accordion-content ${activeSubMenu === "team" ? "open" : ""
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
                className={`mobile-accordion-content ${activeMenu === "project" ? "open" : ""
                  }`}
              >
                <NavLink to="/projects" onClick={handleClose}>
                  All Projects
                </NavLink>

                {/* LOCATION - same nested accordion as OUR TEAM */}
                <div className="nested-accordion">
                  <div
                    className="nested-accordion-title"
                    onClick={() =>
                      setActiveSubMenu(
                        activeSubMenu === "location" ? null : "location",
                      )
                    }
                  >
                    <span>LOCATION</span>
                    <span
                      className={`accordion-arrow ${activeSubMenu === "location" ? "rotate-arrow" : ""
                        }`}
                    >
                      ▼
                    </span>
                  </div>

                  <div
                    className={`nested-accordion-content ${activeSubMenu === "location" ? "open" : ""
                      }`}
                  >
                    {cities.length === 0 ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      cities.map((c) => (
                        <NavLink
                          key={c.name}
                          to={`/search-projects?q=${encodeURIComponent(c.name)}`}
                          onClick={handleClose}
                        >
                          <FiChevronRight className="right-arrow" /> {c.name}
                        </NavLink>
                      ))
                    )}
                  </div>
                </div>

                {/* PROPERTY TYPE */}
                <div className="nested-accordion">
                  <div
                    className="nested-accordion-title"
                    onClick={() =>
                      setActiveSubMenu(
                        activeSubMenu === "ptype" ? null : "ptype",
                      )
                    }
                  >
                    <span>PROPERTY TYPE</span>
                    <span
                      className={`accordion-arrow ${activeSubMenu === "ptype" ? "rotate-arrow" : ""
                        }`}
                    >
                      ▼
                    </span>
                  </div>

                  <div
                    className={`nested-accordion-content ${activeSubMenu === "ptype" ? "open" : ""
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
                          <FiChevronRight className="right-arrow" /> {cat.name}
                        </NavLink>
                      ))
                    )}
                  </div>
                </div>
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
                className={`mobile-accordion-content ${activeMenu === "insights" ? "open" : ""
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
