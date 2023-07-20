import { React, useState } from "react";
import videoBg from "../assets/pexels-tima-miroshnichenko-7985887-4096x2160-25fps.mp4";
import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <div className="main">
          <video className="video-bg" src={videoBg} autoPlay loop muted />
        </div>
        <div className="content text-light">
          <h1 className="title w-75 text-center">
            Your favorite movies and series!
          </h1>
        </div>
      </header>
    </>
  );
}

export default Header;
