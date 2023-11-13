import React from "react";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "ultils/path";
import { SiderBarAdmin } from "components";
import { Outlet } from "react-router-dom";

const Admin = ({ navigate }) => {
  const { isLoggedIn, currentData } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentData)
    Swal.fire(
      "Oops!",
      "Bạn cần đăng nhập trước khi thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.LOGIN}`));
  if (+currentData?.role !== 2002)
    Swal.fire(
      "Oops!",
      "Bạn cần có quyền admin để thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.HOME}`));

  return (
    <div id="admin" className="w-full grid grid-cols-10 gap-5">
      <SiderBarAdmin data={currentData} />
      <div className="col-span-2"></div>
      <main id="main-member" className="col-span-8">
        <Outlet />
      </main>
    </div>
  );
};

export default withBase(Admin);
