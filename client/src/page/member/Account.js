import React from "react";
import { PageHeader } from "components";

const Account = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-0 py-5 pr-5">
      <PageHeader
        category={"quản lý người dùng"}
        header={"Thông tin tài khoản"}
      />
      <div className="w-full border"></div>
    </div>
  );
};

export default Account;
