import React from "react";
import videoBg from "../assets/pexels-tima-miroshnichenko-7985887-4096x2160-25fps.mp4";

function Header() {
  return (
    <>
      <header>
        <div className="main">
          <video src={videoBg} autoPlay loop muted />
        </div>
        <div className="content text-light">
          <h1 className="title">¡Tus peliculas favoritas!</h1>
          <p className="fs-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;
