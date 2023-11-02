import withBase from "hocs/withBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import {
  Button,
  FinalRegister,
  ForgotPassword,
  InputForm,
  Loading,
} from "components";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as apis from "apis";
import { login } from "store/user/appSlice";
import path from "ultils/path";
import { useSearchParams } from "react-router-dom";

const Login = ({ location, dispatch, navigate }) => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [code, setCode] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  // FINAL REGISTER/LOGIN
  const handleSubmits = async (data) => {
    const { email, name, ...payload } = data;
    if (isRegister) {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiRegister(data);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success)
        Swal.fire("Successfully", response.mes, "success").then(() =>
          setIsVerifiedEmail(true)
        );
      else toast.error(response.mes);
    } else {
      const response = await apis.apiLogin(payload);
      if (response.success)
        Swal.fire("Successfully", "Đăng nhập thành công", "success").then(
          () => {
            dispatch(
              login({
                isLoggedIn: true,
                token: response.accessToken,
                currentData: response.userData,
              })
            );
            searchParams.get("redirect")
              ? navigate(searchParams.get("redirect"))
              : navigate(`/${path.HOME}`);
          }
        );
      else toast.error(response.mes);
    }
  };
  // FINAL REGISTER
  const finalregister = async () => {
    const response = await apis.apiFinalRegister(code);
    if (response.success)
      Swal.fire(
        "Successfully",
        "Đăng ký tài khoản thành công! Hãy đăng nhập và tiếp tục",
        "success"
      ).then(() => {
        setIsRegister(false);
        reset();
        setIsVerifiedEmail(false);
        setCode(null);
      });
    else toast.error(response.mes);
  };
  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apis.apiForgotPassword({ email });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success)
      Swal.fire("Successfully", response.mes, "success").then(() => {
        setIsForgotPassword(false);
        reset();
        setEmail(null);
      });
    else toast.error(response.mes);
  };
  // CHECK REGISTER
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [isLoggedIn]);

  return (
    <div className="w-screen h-screen relative">
      {/* FINAL REGISTER */}
      {isVerifiedEmail && (
        <div className="absolute inset-0 flex items-center bg-overlay50 z-10">
          <FinalRegister
            setIsVerifiedEmail={setIsVerifiedEmail}
            setCode={setCode}
            email={watch("email")}
            finalregister={finalregister}
          />
        </div>
      )}
      {/* FORGOT PASSWORD */}
      {isForgotPassword && (
        <div className="absolute inset-0 flex items-center justify-center bg-overlay50 z-10">
          <ForgotPassword
            setIsForgotPassword={setIsForgotPassword}
            setEmail={setEmail}
            handleForgotPassword={handleForgotPassword}
          />
        </div>
      )}
      <img
        src="https://pnrdhcms.org/assets/media/home-page/main/login-bg.jpg"
        alt="background login"
        className="w-full h-full object-cover"
      />
      <div className="p-5 bg-white rounded-md absolute top-1/4 right-[15%] w-[500px] flex flex-col gap-5">
        <h1 className="text-xl uppercase font-bold">
          {isRegister ? "đăng ký" : "đăng nhập"}
        </h1>
        <form
          onSubmit={handleSubmit(handleSubmits)}
          className="w-full flex flex-col gap-2"
        >
          {isRegister && (
            <div className="flex gap-5">
              <InputForm
                label={"tên"}
                id={"name"}
                register={register}
                errors={errors}
                placeholder={"Nhập tên..."}
                validate={{
                  required: "Điền thông tin bắt buộc.",
                }}
                wf
                classInput={"input-bordered"}
              />
              <InputForm
                label={"địa chỉ email"}
                id={"email"}
                register={register}
                type={"email"}
                errors={errors}
                placeholder={"Nhập địa chỉ email..."}
                validate={{
                  required: "Điền thông tin bắt buộc.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Địa chỉ email không hợp lệ.",
                  },
                }}
                wf
                classInput={"input-bordered"}
              />
            </div>
          )}
          <InputForm
            label={"số điện thoại"}
            id={"phone"}
            register={register}
            errors={errors}
            placeholder={"Nhập số điện thoại..."}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Số điện thoại không hợp lệ.",
              },
            }}
            wf
            classInput={"input-bordered"}
          />
          <InputForm
            label={"mật khẩu"}
            id={"password"}
            register={register}
            errors={errors}
            type={"password"}
            placeholder={"Nhập mật khẩu..."}
            validate={{
              required: "Điền thông tin bắt buộc.",
            }}
            wf
            classInput={"input-bordered"}
          />
          <Button
            name={isRegister ? "đăng ký" : "đăng nhập"}
            wf
            type={"submit"}
            styles={"btn-primary text-white"}
          />
        </form>
        <div className="w-full">
          {isRegister ? (
            <span>
              Bạn đã có tài khoản?{" "}
              <span
                className="text-blue-500 hover:text-red-500 transition-all cursor-pointer"
                onClick={() => {
                  setIsRegister(false);
                  reset();
                }}
              >
                Đăng nhập
              </span>
            </span>
          ) : (
            <div className="flex flex-col gap-1">
              <span>
                Bạn chưa có tài khoản?{" "}
                <span
                  className="text-blue-500 hover:text-red-500 transition-all cursor-pointer"
                  onClick={() => {
                    setIsRegister(true);
                    reset();
                  }}
                >
                  Đăng ký
                </span>
              </span>
              <span>
                Quên mật khẩu?{" "}
                <span
                  className="text-blue-500 hover:text-red-500 transition-all cursor-pointer"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Nhấn vào đây
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBase(Login);
