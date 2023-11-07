import { SideBarMember } from "components";
import withBase from "hocs/withBase";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import path from "ultils/path";

const Member = ({ navigate }) => {
  const { currentData, isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentData)
    Swal.fire(
      "Oops!",
      "Bạn cần đăng nhập trước khi thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.LOGIN}`));

  return (
    <div id="memder" className="w-full grid grid-cols-10 gap-5">
      <SideBarMember data={currentData} />
      <div className="col-span-2"></div>
      <main id="main-member" className="col-span-8">
        <Outlet />
      </main>
    </div>
  );
};

export default withBase(Member);
