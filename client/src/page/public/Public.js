import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopFooter } from "components";

const Public = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 115) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [115]);
  return (
    <div id="public" className="w-full flex flex-col gap-5">
      <header id="header" className="w-full flex flex-col gap-3">
        <Header />
        <Navigation fixed={isFixed} />
      </header>
      <main id="main" className="w-main mx-auto">
        <Outlet />
      </main>
      <footer id="footer" className="w-full flex flex-col gap-5 pt-5">
        <TopFooter />
        <Footer />
      </footer>
    </div>
  );
};

export default Public;
