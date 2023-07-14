import { useEffect, useState } from "react";

function Scroll() {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return;
}

export default Scroll;
