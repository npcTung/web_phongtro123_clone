import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation } from "components";

const Public = () => {
  return (
    <div id="public" className="w-full flex flex-col gap-5">
      <header id="header" className="w-full flex flex-col gap-3">
        <Header />
        <Navigation />
      </header>
      <main id="main" className="w-main mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Public;
