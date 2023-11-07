import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopFooter } from "components";
import icons from "ultils/icons";

const { BsArrowUp } = icons;

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
      <header id="header-public" className="w-full flex flex-col gap-3">
        <Header />
        <Navigation fixed={isFixed} />
      </header>
      <main id="main-public" className="w-main mx-auto">
        <Outlet />
        {isFixed && (
          <span
            className="fixed right-3 bottom-3 p-3 rounded-full cursor-pointer bg-main-red text-white text-3xl"
            onClick={() => window.scrollTo(0, 0)}
          >
            <BsArrowUp />
          </span>
        )}
      </main>
      <footer id="footer-public" className="w-full flex flex-col gap-5 pt-5">
        <TopFooter />
        <Footer />
      </footer>
    </div>
  );
};

export default Public;
