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
gsap.registerPlugin(ScrollTrigger); // 👈 REQUIRED
function App() {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.08 });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.normalizeScroll(true);

    const resize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
        <Route path="/blog/:id/:slug" element={<BlogDetailPage />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/client-testimonial" element={<ClientTestimonials />} />
        <Route path="/insight/news&media" element={<NewMedia />} />
        <Route
          path="/insight/news&media/:id/:slug"
          element={<NewsDetailPage />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/aboutus/awards" element={<Awards />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/:slug" element={<ProjectDetailPage />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/job/:id" element={<JobDescription />} />
        <Route path="/search-projects" element={<SearchedProject />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
