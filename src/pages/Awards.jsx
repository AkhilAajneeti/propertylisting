import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";
import ScrollSections from "../components/ScrollSections";
gsap.registerPlugin(ScrollTrigger);
const Awards = () => {
      useEffect(() => {
        // --- LENIS SMOOTH SCROLL SETUP ---
        const lenis = new Lenis({
          smooth: true,
          lerp: 0.08,
          direction: "vertical",
          smoothTouch: true,
        });
    
        // keep Lenis and ScrollTrigger in sync
        lenis.on("scroll", ScrollTrigger.update);
    
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    
        // normalize scroll for GSAP
        ScrollTrigger.normalizeScroll(true);
    
        // Reset scroll triggers on resize
        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);
    
        // --- TEXT ANIMATION ---
        gsap.utils.toArray(".text-drop__line").forEach((line, i) => {
          gsap.fromTo(
            line,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.1, // slight stagger
              scrollTrigger: {
                trigger: line,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
    
        // --- IMAGE REVEAL ---
        gsap.utils.toArray(".text-drop__img-box").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.2, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
    
        // --- PARALLAX EFFECT ---
        gsap.utils.toArray(".has-prlx").forEach((el) => {
          gsap.to(el, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
    
        gsap.from(".leadershipTeam img", {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
    
          scrollTrigger: {
            trigger: ".leadershipTeam",
            start: "top 70%", // you can try 70% or even 60%
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.from(".managementTeam img", {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
    
          scrollTrigger: {
            trigger: ".managementTeam",
            start: "top 70%", // you can try 70% or even 60%
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
    
        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize);
          ScrollTrigger.getAll().forEach((t) => t.kill());
          lenis.destroy();
        };
      }, []);
      useEffect(() => {
        // Wait for fonts to load before animation
        document.fonts.ready.then(() => {
          gsap.set(".split2", { opacity: 1 });
    
          const elements = document.querySelectorAll(".split2");
    
          elements.forEach((el, i) => {
            // Split text into words
            const split = new SplitType(el, { types: "words", tagName: "span" });
    
            // Animate words
            gsap.from(split.words, {
              opacity: 0,
              y: 50, // slide up
              duration: 1,
              ease: "sine.out",
              stagger: 0.2,
              delay: i * 0.3,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            });
          });
        });
      }, []);

  return (
    <div>
      <div className="AwardsBanner">
        <h1 className="split2">Awards And Recognition</h1>
      </div>
      <div className="awardcontent text-center w-100 py-3 d-flex align-items-center justify-content-center ">
      <span className="py-5 text-center split2">A</span>
      <span className="py-5 text-center split2">w</span>
      <span className="py-5 text-center split2">a</span>
      <span className="py-5 text-center split2">r</span>
      <span className="py-5 text-center split2">d</span>
      <span className="py-5 text-center split2">s</span>
      <img src="/awards/trophy.png" alt="" className="img-fluid" style={{height:"80px"}}/>
      {/* <img src="/public/awards/bgnon.png" alt="" className="img-fluid" style={{height:"100px"}}/> */}
      </div>
      <ScrollSections/>
    </div>
  );
};

export default Awards;
