import React from "react";
import { PageHeader } from "components";

const DashBoard = () => {
  return (
    <div className="w-full flex flex-col gap-0 py-5 pr-5">
      <PageHeader category={"Quản trị viên"} header={"Bảng điều khiển"} fixed />
      <div className="w-full h-[93px]"></div>
    </div>
  );
};

export default DashBoard;
