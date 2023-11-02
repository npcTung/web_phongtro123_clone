import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import path from "ultils/path";
import { Admin } from "page/admin";
import { Member } from "page/member";
import { Home, Public } from "page/public";
import { Login, ResetPassword } from "page/auth";
import withBase from "hocs/withBase";
import { getCategories } from "store/app/asyncActions";
import { useSelector } from "react-redux";
import { Modal } from "components";
import { getCurrent } from "store/user/asyncActions";
import { ToastContainer } from "react-toastify";

function App({ dispatch }) {
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(getCategories());
      if (isLoggedIn) dispatch(getCurrent());
    }, 1000);
    return () => clearTimeout(setTimeoutId);
  }, [isLoggedIn]);

  return (
    <div className="w-full bg-[#f5f5f5]">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.ADMIN} element={<Admin />}></Route>
        <Route path={path.MEMBER} element={<Member />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default withBase(App);
