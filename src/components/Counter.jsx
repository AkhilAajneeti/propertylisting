import { useEffect, useState } from "react";

// Single number counter
const NumberCounter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // assuming 60 fps
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.ceil(start));
    }, 1000 / 60);

    return () => clearInterval(counter); // cleanup
  }, [end, duration]);

  return <span>{count}</span>;
};

// Counter section
const CounterSection = () => {
  return (
    <div
      className="container-fluid counter"
      style={{
       backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url('/backbanner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        padding: "40px 20px",
        color: "white",
      }}
    >
      <div className="row text-center gy-2 g-md-0">
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={72418} duration={6} /> Cr.<br />
          <span className="color-brown" >Worth property sold</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={150000} duration={6} /> +<br />
          <span className="color-brown" >Happy Customer</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={100} duration={6} /> +<br />
         <span className="color-brown" >Happy Customer</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={700} duration={6} /> +<br />
          <span className="color-brown" >Projects</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={30} duration={6} /> +<br />
         <span className="color-brown" > Offices in India</span>
        </div>
        <div className="col-lg-2 col-sm-4 col-6 mainFont-2">
          <NumberCounter end={3} duration={6} /> +<br />
          <span className="color-brown" >Offices Worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
