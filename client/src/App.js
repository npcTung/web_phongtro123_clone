import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import path from "ultils/path";
import { Admin } from "page/admin";
import { Member } from "page/member";
import { Home, Public } from "page/public";
import { Login } from "page/auth";
import withBase from "hocs/withBase";
import { getCategories } from "store/app/asyncActions";

function App({ dispatch }) {
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(getCategories());
    }, 1000);
    return () => clearTimeout(setTimeoutId);
  }, []);

  return (
    <div className="w-full bg-[#f5f5f5]">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.ADMIN} element={<Admin />}></Route>
        <Route path={path.MEMBER} element={<Member />}></Route>
      </Routes>
    </div>
  );
}

export default withBase(App);
