import React, { memo } from "react";
import { Button } from "components";
import icons from "ultils/icons";

const { MdOutlineClear } = icons;

const FinalRegister = ({
  setIsVerifiedEmail,
  setCode,
  email,
  finalregister,
}) => {
  return (
    <div className="w-[500px] mx-auto bg-white rounded-md">
      <h1 className="uppercase p-4 bg-sky-500 text-white rounded-t-md font-medium flex justify-between">
        <span></span>
        <span>mã xác nhận</span>
        <span
          className="cursor-pointer"
          onClick={() => {
            setIsVerifiedEmail(false);
            setCode("");
          }}
        >
          <MdOutlineClear size={20} />
        </span>
      </h1>
      <div className="p-10 flex flex-col gap-10">
        <span className="text-gray-400">
          Chúng tôi đã gửi một mã đến email của bạn. Vui lòng kiểm tra email của
          bạn và nhập mã của bạn.
          <br />
          <strong className="font-medium text-blue-400 line-through">
            {email}
          </strong>
        </span>
        <input
          type="text"
          name="Code"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Mã xác nhận..."
          className="input input-bordered bg-gray-100 w-full"
        />
        <Button
          name={"gửi"}
          wf
          handleOnClick={finalregister}
          styles={"btn-info text-white"}
        />
      </div>
    </div>
  );
};

export default memo(FinalRegister);
