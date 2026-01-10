import { useEffect, useRef, useState, memo } from "react";

const NumberCounter = memo(({ end, duration }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const elementRef = useRef(null);

  const animateCount = () => {
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );
      const value = Math.floor(progress * end);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animateCount();
        }
      },
      { threshold: 0.4 } // start when 40% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return <span ref={elementRef}>{count}</span>;
});

const CounterSection = () => {
  return (
    <div
      className="container-fluid counter"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url('/backbanner.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        padding: "40px 20px",
        color: "white",
      }}
    >
      <div className="row text-center gy-2 g-md-0 align-content-center justify-content-center">
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={1000} duration={2} /> +
          <br />
          <span className="color-brown">Happy Familys </span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={1} duration={1} />.5 million <br />
          <span className="color-brown">Area sold</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={250} duration={2} /> +<br />
          <span className="color-brown">Projects</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={6} duration={2} /> +<br />
          <span className="color-brown">Offices in India</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={1} duration={2} /> +<br />
          <span className="color-brown">Offices Worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
