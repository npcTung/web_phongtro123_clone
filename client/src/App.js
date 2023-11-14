import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import path from "ultils/path";
import { Admin, DashBoard, ManagePostAdmin, ManageUser } from "page/admin";
import { Account, CreatePost, ManagePost, Member } from "page/member";
import { Contact, DetailPost, Home, Posts, Public } from "page/public";
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
          <Route path={path.LIEN_HE} element={<Contact />} />
          <Route path={path.POST__CATEGORY} element={<Posts />} />
          <Route
            path={`${path.POST__CATEGORY}/${path.DETAIL_PRODUCT__PID__TITLE}`}
            element={<DetailPost />}
          />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.ALL} element={<DashBoard />} />
          <Route path={path.DASH_BOARD} element={<DashBoard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_POST} element={<ManagePostAdmin />} />
        </Route>
        <Route path={path.MEMBER} element={<Member />}>
          <Route path={path.ALL} element={<ManagePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<Account />} />
          <Route path={path.CREATE_POST} element={<CreatePost />} />
        </Route>
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
