import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mainfooter py-5" style={{ zIndex: "99!important" }}>
      <div className="container">
        <div className="row ">
          {/* Left Column */}
          <div className="col-lg-4 col-12 mb-4">
            {/* Logo */}
            {/* <h4 className="fw-bold mb-3">ANAROCK</h4> */}
            <img src="/Group-2.png" alt="Anarock" height="100" className="" />
            {/* <p className="mb-0 small fw-bold text-uppercase">Jenika Ventures</p> */}

            {/* Social Links */}
            <div className="d-flex gap-3 my-3">
              <a
                href="https://www.facebook.com/jenikaventures"
                className="text-light"
              >
                <FaFacebookF />
              </a>
              <a href="https://x.com/JenikaVentures" className="text-light">
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/company/71280221/admin/dashboard/"
                className="text-light"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/jenikaventures/"
                className="text-light"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@jenikaventures"
                className="text-light"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.threads.com/@jenikaventures"
                className="text-light"
              >
                <FaThreads />
              </a>
            </div>

            {/* Newsletter */}
            {/* <p className="fw-semibold">
              Stay updated with latest trends & reports.
            </p>
            <div className=" form input-group">
              <input
                type="email"
                className="form-control border"
                placeholder="Email address"
              />
              <button className="btn border-0">Subscribe</button>
            </div> */}
          </div>
          {/* About Us */}
          <div className="col-lg-2 col-6 col-md-6 mb-4">
            <h6 className="fw-bold">About Us</h6>
            <ul className="list-unstyled ">
              <li>
                <Link to="/whoweare" className="link link--metis">
                  Who we are
                </Link>
              </li>

              <li>
                <Link to="/client-testimonial" className="link link--metis">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link to="/aboutus/awards" className="link link--metis">
                  Awards & Recognition
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="link link--metis">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div className="col-lg-2 col-6 col-md-6 mb-4">
            <h6 className="fw-bold">Projects</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/projects?propertytype=Residential"
                  className="link link--metis"
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  to="/projects?propertytype=CommerciaLink"
                  className="link link--metis"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  to="/projects?propertytype=Studio"
                  className="link link--metis"
                >
                  Studio Appartments
                </Link>
              </li>
              <li>
                <Link
                  to="/projects?propertytype=Plots"
                  className="link link--metis"
                >
                  Plots
                </Link>
              </li>
            </ul>
          </div>
          {/* Technology */}
          <div className="col-lg-2 col-6 col-md-6 mb-4">
            <h6 className="fw-bold">Developers</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="link link--metis">
                  TATA
                </a>
              </li>
              <li>
                <a href="#" className="link link--metis">
                  ATS
                </a>
              </li>
              <li>
                <a href="#" className="link link--metis">
                  Omaxe
                </a>
              </li>
              <li>
                <a href="#" className="link link--metis">
                  Bhutani
                </a>
              </li>
              <li>
                <a href="#" className="link link--metis">
                  M3M
                </a>
              </li>
              <li>
                <a href="#" className="link link--metis">
                  Godrej
                </a>
              </li>
            </ul>
          </div>
          {/* Projects */}
          <div className="col-lg-2 col-6 col-md-6 mb-4">
            <h6 className="fw-bold">Others</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/career" className="link link--metis">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link--metis">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy" className="link link--metis">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <h6 className="fw-bold">Insights</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/insight/news&media" className="link link--metis">
                  New & Media
                </Link>
              </li>

              <li>
                <Link to="/blog" className="link link--metis">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-top pt-3 mt-4 text-center small text-light">
          We value diversity within Jenika Ventures and are committed to
          offering equal opportunities in employment...
        </div>
        <div className=" pt-3 text-center small text-light">
          Developed By{" "}
          <a href="https://aajneeti.social/" target="_blank">
            Aajneeti Connect Ltd.
          </a>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
