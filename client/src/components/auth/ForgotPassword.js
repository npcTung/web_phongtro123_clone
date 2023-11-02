import React, { memo } from "react";
import { Button } from "components";

const ForgotPassword = ({
  setIsForgotPassword,
  setEmail,
  handleForgotPassword,
}) => {
  return (
    <div className="w-[900px]">
      <div className="flex justify-end mb-2">
        <span
          className="text-white capitalize hover:underline transition-all cursor-pointer"
          onClick={() => {
            setIsForgotPassword(false);
            setEmail(null);
          }}
        >
          quay lại trang đăng nhập
        </span>
      </div>
      <div className="bg-white pb-20 rounded-md">
        <h1 className="p-4 uppercase text-xl text-center bg-sky-500 text-white rounded-t-md">
          quên mật khẩu
        </h1>
        <div className="flex flex-col gap-10 p-4 w-3/5 mx-auto">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Nhập email người dùng"
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered bg-gray-100 w-full mt-20"
          />
          <Button
            name="Gửi"
            wf
            handleOnClick={handleForgotPassword}
            styles="shadow-md btn-info text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ForgotPassword);
