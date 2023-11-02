import React, { useState } from "react";
import { Button } from "components";
import path from "ultils/path";
import Logo from "assets/logo-phongtro.svg";
import { useParams } from "react-router-dom";
import * as apis from "apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";

const ResetPassword = ({ navigate }) => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  //SUBMIT RESET PASSWORD
  const handleResetPassword = async () => {
    const response = await apis.apiResetPassword({ password, token });
    if (response.success)
      Swal.fire("Congratulations", response.mes, "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    else toast.error(response.mes, { theme: "colored" });
  };
  return (
    <div className="h-screen w-screen bg-red-50 flex justify-center items-center py-8 z-10 relative">
      <img
        src="https://www.citrixguru.com/wp-content/uploads/2018/12/PasswordResetShareFile.jpg"
        alt="reset password"
        className="w-full h-full object-cover"
      />
      <div className="w-[900px] my-auto absolute">
        <div className="flex justify-between mb-10">
          <img
            src={Logo}
            alt="Logo"
            className="w-[234px] object-contain cursor-pointer"
            onClick={() => {
              navigate(`/${path.HOME}`);
            }}
          />
          <span
            className="text-pink-500 capitalize hover:underline transition-all cursor-pointer"
            onClick={() => {
              navigate(`/${path.LOGIN}`);
            }}
          >
            quay lại trang đăng nhập
          </span>
        </div>
        <div className="border rounded-md bg-white pb-20">
          <h1 className="p-4 uppercase text-xl text-center bg-main text-white rounded-t-md">
            quên mật khẩu
          </h1>
          <div className="flex flex-col gap-10 p-4 w-3/5 mx-auto">
            <input
              type="password"
              name="passwordNew"
              id="passwordNew"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered bg-gray-100 w-full mt-20"
            />
            <Button
              name={"Gửi"}
              wf
              handleOnClick={handleResetPassword}
              styles={"shadow-md btn-info text-white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(ResetPassword);
