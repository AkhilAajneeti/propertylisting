import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  {
    id: "2021",
    title: "Technology",
    text: "OVA recognizes the exceptional potential of the technology sector, where each breakthrough opens up promising investment opportunities.",
    // image: "/awards/8745tuhgrjrkf.jpg",
    image: "/awards/NEW.png",
  },
  {
    id: "2022",
    title: "Innovation",
    text: "By focusing on transformative companies, OVA supports innovation that shapes tomorrow’s digital landscape.",
    image: "/awards/awards-2022-new.jpg",
  },
  {
    id: "2023",
    title: "Sustainability",
    text: "Investing in ideas that bring both growth and a sustainable future for our planet.",
    image: "/awards/Fairfox.jpg",
  },
  {
    id: "2024",
    title: "Growth",
    text: "Each investment we make builds long-term value — balancing vision with performance.",
    image: "/awards/newefhuenfe.jpg",
  },
];

export default function ScrollSections() {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // ✅ Initialize Lenis smooth scroll
    const lenis = new Lenis({ lerp: 0.1, smooth: true });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // ✅ GSAP horizontal scroll setup
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");

      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          id: "scroll",
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panels.length - 1));
            setActiveSection(index);
          },
        },
      });

      // ✅ Text animation (optional)
      panels.forEach((panel) => {
        const title = panel.querySelector(".panel-title");
        const text = panel.querySelector(".panel-text");
        if (!title || !text) return;

        const split = new SplitType(title, { types: "words" });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 60,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        });

        gsap.from(text, {
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, containerRef);

    // ✅ Navigation visibility control
    gsap.set(".section-indicator", { autoAlpha: 0 });

    ScrollTrigger.create({
      trigger: ".mainContainer",
      start: "top center",
      onEnter: () =>
        gsap.to(".section-indicator", { autoAlpha: 1, duration: 0.5 }),
      onLeaveBack: () =>
        gsap.to(".section-indicator", { autoAlpha: 0, duration: 0.5 }),
    });

    ScrollTrigger.create({
      trigger: ".end",
      start: "top bottom",
      onEnter: () =>
        gsap.to(".section-indicator", { autoAlpha: 0, duration: 0.5 }),
      onLeaveBack: () =>
        gsap.to(".section-indicator", { autoAlpha: 1, duration: 0.5 }),
    });

    return () => ctx.revert();
  }, []);

  // ✅ Smooth click navigation
  const handleClick = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const panelsCount = sections.length;
    const start = container.offsetTop;
    const scrollDistance = container.offsetWidth; // ScrollTrigger end distance
    const progress = index / (panelsCount - 1);
    const targetY = Math.round(start + progress * scrollDistance);

    // Smooth scroll via Lenis or fallback to GSAP
    lenisRef.current.scrollTo(targetY, {
      offset: 0,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  return (
    <div className="scroll-wrapper">
      {/* === Right-side year navigation === */}
      <div className="section-indicator">
        {sections.map((sec, index) => (
          <div
            key={sec.id}
            className={`indicator-number ${
              activeSection === index ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {sec.id}
          </div>
        ))}
      </div>

      {/* === Horizontal scroll panels === */}
      <div className="scroll-sections mainContainer" ref={containerRef}>
        {sections.map((sec) => (
          <section
            key={sec.id}
            className="panel award-img"
            style={{
              backgroundImage: `url(${sec.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }} >
            {/* <div className="overlay"></div> */}
           
          </section>
        ))}
      </div>

      {/* === Footer trigger === */}
      <div className="end"></div>
    </div>
  );
}
