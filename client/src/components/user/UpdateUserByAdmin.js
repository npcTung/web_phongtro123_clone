import withBase from "hocs/withBase";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showModal } from "store/app/appSlice";
import icons from "ultils/icons";
import { Button, InputForm, Select } from "components";
import * as apis from "apis";
import { toast } from "react-toastify";

const { MdOutlineClear } = icons;

const activeCode = ["Active", "Blocked"];

const roleCode = ["Admin", "User"];

const UpdateUserByAdmin = ({ dispatch, dataUser, rerender }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleUpdateUserByAdmin = async (data) => {
    if (data.role === "Admin") data.role = 2002;
    else data.role = 2023;
    const response = await apis.apiUpdateUserByAdmin(dataUser?.id, data);
    if (response.success) {
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      reset();
      rerender();
      toast.success("Cập nhập tài khoản thành công");
    } else toast.error(response.mes);
  };

  useEffect(() => {
    reset({
      name: dataUser?.name,
      phone: dataUser?.phone,
      zalo: dataUser?.zalo,
      email: dataUser?.email,
      fbUrl: dataUser?.fbUrl,
      isBlocked: +dataUser?.isBlocked,
      role: +dataUser?.role === 2002 ? "Admin" : "User",
    });
  }, [dataUser]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-md p-5"
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b pb-5">
        <span className="capitalize">{`sửa thông tin sản phẩm "${dataUser?.name?.toLowerCase()}"`}</span>
        <span
          className="cursor-pointer"
          onClick={() => {
            reset();
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
          }}
        >
          <MdOutlineClear />
        </span>
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdateUserByAdmin)}
        className="flex flex-col gap-5 py-5 px-2"
      >
        <div className="flex justify-between gap-5">
          <InputForm
            label={"Tên"}
            id={"name"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            errors={errors}
            wf
          />
          <InputForm
            label={"Số điện thoại"}
            id={"phone"}
            register={register}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Số điện thoại không hợp lệ.",
              },
            }}
            errors={errors}
            wf
          />
        </div>
        <div className="flex justify-between gap-5">
          <InputForm
            label={"Địa chỉ email"}
            id={"email"}
            register={register}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ.",
              },
            }}
            errors={errors}
            wf
          />
          <InputForm
            label={"facebook"}
            id={"fbUrl"}
            register={register}
            validate={{
              required: "Điền thông tin bắt buộc.",
            }}
            errors={errors}
            wf
          />
          <InputForm
            label={"Zalo"}
            id={"zalo"}
            register={register}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Số điện thoại không hợp lệ.",
              },
            }}
            errors={errors}
            wf
          />
        </div>
        <div className="flex justify-between gap-5">
          <Select
            label={"role"}
            id={"role"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            wf
            options={roleCode.map((el) => ({ code: el, value: el }))}
            errors={errors}
          />
          <Select
            label={"active"}
            id={"isBlocked"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            wf
            options={activeCode.map((el, idx) => ({ code: idx, value: el }))}
            errors={errors}
          />
        </div>
        <Button
          name={"Sửa tài khoản người dùng"}
          wf
          styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default withBase(memo(UpdateUserByAdmin));
