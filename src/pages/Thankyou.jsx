import React, { useEffect } from "react";
import gsap from "gsap";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

const Thankyou = () => {
  useEffect(() => {
    gsap.from(".ty-title", {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".ty-text", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      stagger: 0.15,
    });

    gsap.from(".ty-btn", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out",
      stagger: 0.15,
    });

    // const timer = setTimeout(() => {
    //   window.location.href = "/";
    // }, 5000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "linear-gradi#ffffffent(327deg, #c80a17 20%, #000000)40%",

         backgroundPosition:"center",
         backgroundSize:"cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
        position: "relative",
      }}
    >
      {/* CONFETTI STARTS IMMEDIATELY */}
      <Confetti numberOfPieces={350} recycle={false} />

      <div className="thankyou">
        <h1
          className="text-center"
          style={{
            fontSize: "52px",
            fontWeight: 800,
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            WebkitBackgroundClip: "text",
            color: "black",
          }}
        >
          🎉 Thank You!
        </h1>

        <p
          className="text-center"
          style={{
            fontSize: "20px",
            marginTop: "12px",
            color: "#000000ff",
          }}
        >
          Your enquiry has been submitted successfully.
        </p>

        <p
          className="text-center"
          style={{
            fontSize: "18px",
            marginTop: "6px",
            color: "#000000ff",
          }}
        >
          Our team will contact you shortly.
        </p>

        <div style={{ marginTop: "32px" }}>
          
          <Link to="/projects">
            <button
              className=""
              style={{
                background: "linear-gradient(108deg, #f5ebac 15.49%, #b49249 100%)",
                padding: "14px 28px",
                borderRadius: "10px",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              View More Projects
            </button>
          </Link>
        </div>
      </div>

      <div className="thankyouBg">
        <img src="/public/bg-full-1.png" alt=""/>
      </div>
    </div>
  );
};

export default Thankyou;
