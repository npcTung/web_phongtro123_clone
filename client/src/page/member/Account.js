import React, { useEffect, useState } from "react";
import { Avatar, Button, InputForm, Loading, PageHeader } from "components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { formatTime, getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import * as apis from "apis";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getCurrent } from "store/user/asyncActions";
import moment from "moment";

const Account = ({ dispatch }) => {
  const { currentData } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const handleUpdateAccount = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    delete data.id;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apis.apiUpdateUser(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      toast.success("Cập nhập tài khoản thành công");
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  const handleAvatar = async (file) => {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      toast.warning(
        "Định dạng ảnh sai chỉ nhận định dạng file có đuôi .png hoặc .jpg",
        { theme: "colored" }
      );
      return;
    } else {
      const base64Thumb = await getBase64(file);
      setAvatar(base64Thumb);
    }
  };

  useEffect(() => {
    if (watch("avatar") instanceof FileList && watch("avatar").length > 0)
      handleAvatar(watch("avatar")[0]);
  }, [watch("avatar")]);

  useEffect(() => {
    reset({
      id: `#${currentData?.id}` || "",
      phone: currentData?.phone || "",
      name: currentData?.name || "",
      email: currentData?.email || "",
      zalo: currentData?.zalo || "",
      fbUrl: currentData?.fbUrl || "",
    });
  }, [currentData]);

  return (
    <div className="w-full flex flex-col gap-0 py-5 pr-5">
      <PageHeader
        category={"quản lý người dùng"}
        header={"Cập nhật thông tin cá nhân"}
        fixed
      />
      <div className="w-full h-[93px]"></div>
      <form
        onSubmit={handleSubmit(handleUpdateAccount)}
        className="w-3/5 mx-auto flex flex-col gap-5 pt-10"
      >
        <InputForm
          label={`Mã thành viên`}
          id={"id"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          disabled
        />
        <InputForm
          label={`Số điện thoại`}
          id={"phone"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          disabled
        />
        <div className="w-full flex items-center gap-5">
          <label className="label label-text capitalize opacity-70">
            Tình trạng tài khoản:
          </label>
          <span
            className={`font-semibold ${
              currentData?.isBlocked ? "text-main" : "text-green-500"
            }`}
          >
            {currentData?.isBlocked ? "Blocked" : "Actived"}
          </span>
        </div>
        <div className="w-full flex items-center gap-1">
          <label className="label label-text capitalize opacity-70">
            Vai trò:
          </label>
          <span className={`font-semibold`}>
            {+currentData?.role === 2002 ? "Admin" : "User"}
          </span>
        </div>
        <div className="w-full flex items-center gap-1">
          <label className="label label-text capitalize opacity-70">
            Ngày tạo:
          </label>
          <span className={`font-semibold`}>
            {moment(currentData?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        </div>
        <div className="w-full flex items-center gap-1">
          <label className="label label-text capitalize opacity-70">
            Ngày cập nhật:
          </label>
          <span className={`font-semibold`}>
            {formatTime(currentData?.updatedAt)}
          </span>
        </div>
        <InputForm
          label={`Tên hiển thị`}
          id={"name"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          classInput={"bg-white"}
        />
        <InputForm
          label={`địa chỉ Email`}
          id={"email"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          classInput={"bg-white"}
        />
        <InputForm
          label={`Số Zalo`}
          id={"zalo"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          classInput={"bg-white"}
        />
        <InputForm
          label={`Facebook`}
          id={"fbUrl"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          classInput={"bg-white"}
        />
        <Avatar
          label={"Ảnh đại diện"}
          register={register}
          errors={errors}
          id={"avatar"}
          avatar={avatar || currentData?.avatar}
        />
        <Button
          name={"Cập nhập thông tin tài khoản"}
          wf
          styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default withBase(Account);
