import React from "react";
import photo from "../assets/photo1.png";

function Effect() {
  return (
    <section
      id="home"
      className="min-vh-100 d-flex align-items-center justify-content-center text-center position-relative px-3"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container">

        {/* Portrait */}
        <div className="d-flex justify-content-center mb-4 mb-md-5">
          <div
            className=""
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <img
              src={photo}
              alt="Jeet Nathwani"
              className=""
              style={{
                width: "220px",
                height: "280px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Name */}
        <h1
          className="fw-bold display-6 display-md-4 display-lg-3"
          style={{
            WebkitTextStroke: "2px #e5e7eb",
            WebkitTextFillColor: "transparent",
          }}
        >
          Jeet Nathwani
        </h1>

        {/* Subtitle */}
        <p className="text-light opacity-75 mt-3 fs-6 fs-md-5">
          Full Stack Developer • MERN • React
        </p>

        {/* CTA Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4 mt-md-5">
          <button className="btn btn-light rounded-pill px-4 px-md-5">
            See my creations
          </button>

          <button className="btn btn-outline-light rounded-pill px-4 px-md-5">
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}

export default Effect;
