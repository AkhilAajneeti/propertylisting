import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Whoweare from "./pages/Whoweare";
import OurTeam from "./pages/OurTeam";
import NewMedia from "./pages/NewMedia";
import ClientTestimonials from "./pages/ClientTestimonials";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Projects from "./pages/Projects";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Awards from "./pages/Awards";
import RefreshFromTop from "./components/RefreshFromTop";
import Thankyou from "./pages/Thankyou";
import JobDescription from "./pages/JobDescription";
import NewsDetailPage from "./pages/NewsDetailPage";
import SearchedProject from "./pages/SearchedProject";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import IpoAdvisory from "./pages/IpoAdvisory";
import DoorstepPropertyAccess from "./pages/DoorstepPropertyAccess";
import ClientRegistration from "./pages/ClientRegistration";
import PaymentStatus from "./pages/PaymentStatus";
import BillionairesPropertyFestival from "./pages/BillionairesPropertyFestival";
gsap.registerPlugin(ScrollTrigger); // 👈 REQUIRED
function App() {
  useEffect(() => {
    // A phone's address bar sliding in and out fires resize. The old
    // manual ScrollTrigger.refresh() on every resize therefore re-measured
    // every trigger mid-scroll, which is what made the page jump.
    // ScrollTrigger refreshes itself; it just needs telling to ignore this.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Native scrolling on touch. Lenis easing layered on top of the phone's
    // own momentum means the two disagree about scroll position frame to
    // frame - that disagreement was the shaking.
    const coarsePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer || ScrollTrigger.isTouch === 1) return undefined;

    // smoothWheel is the real option name in Lenis 1.x - the old
    // `smooth: true` was silently ignored. syncTouch stays off so touch
    // input is never intercepted.
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Driven off GSAP's ticker rather than a second requestAnimationFrame
    // loop, so there is one clock instead of two racing each other.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <Navbar />
      <RefreshFromTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<Whoweare />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogslug" element={<BlogDetailPage />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/our-team/ipo-advisory" element={<IpoAdvisory />} />
        <Route path="/client-testimonial" element={<ClientTestimonials />} />
        <Route path="/insight/news&media" element={<NewMedia />} />
        <Route
          path="/insight/news&media/:newsslug"
          element={<NewsDetailPage />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/aboutus/awards" element={<Awards />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:project_slug" element={<ProjectDetailPage />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/job/:job_slug" element={<JobDescription />} />
        <Route path="/search-projects" element={<SearchedProject />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsCondition />} />
        <Route
          path="/doorstep-property-access"
          element={<DoorstepPropertyAccess />}
        />
        <Route path="/client-registration" element={<ClientRegistration />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route
          path="/billionaires-property-festival"
          element={<BillionairesPropertyFestival />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
