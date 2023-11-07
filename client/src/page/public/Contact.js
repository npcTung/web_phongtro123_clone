import React from "react";
import { Button, InputForm, PageHeader } from "components";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleSubmits = (data) => {
    data
      ? Swal.fire(
          `Cảm ơn ${data ? data.name : null}!`,
          "Phản hồi của bạn đã được chúng tôi ghi nhận",
          "success"
        ).then(() => reset())
      : Swal.fire(
          "Opps!",
          "Bạn chưa cung cấp thông tin và mô tả cho chúng tôi",
          "error"
        ).then(() => reset());
  };
  return (
    <div className="w-main mx-auto">
      <PageHeader category={"liên hệ"} />
      <h1 className="text-2xl font-semibold my-6">Liên hệ với chúng tôi</h1>
      <div className=" flex gap-4">
        <div className="flex-1 h-fit bg-main-blue p-5 rounded-[30px] shadow-md flex flex-col text-white gap-4">
          <h4 className="text-xl font-semibold">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro.Com
          </span>
          <span>
            <b>Điện thoại</b>: 0917 686 101
          </span>
          <span>
            <b>Email</b>: cskh.phongtro@gmail.com
          </span>
          <span>
            <b>Zalo</b>: 0917 686 101
          </span>
          <span>
            <b>Viber</b>: 0917 686 101
          </span>
          <span>
            <b>Địa chỉ</b>: LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí
            Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-[30px] p-5">
          <h4 className="font-medium text-xl mb-5">Liên hệ trực tuyến</h4>
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="flex flex-col gap-5"
          >
            <InputForm
              label="họ và tên của bạn"
              id={"name"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              placeholder={"Nhập tên..."}
              wf
              classInput={"input-bordered"}
            />
            <InputForm
              label="số điện thoại"
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
              placeholder={"Nhập số điện thoại..."}
              wf
              classInput={"input-bordered"}
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="desc"
                className="text-sm label-text capitalize opacity-70"
              >
                nội dung mô tả
              </label>
              <textarea
                id="desc"
                {...register("description", {
                  required: "Điền thông tin bắt buộc.",
                })}
                placeholder="Nhập nội dung mô tả..."
                className="input input-bordered w-full min-h-[100px] max-h-[300px] py-2 bg-gray-100 placeholder:text-sm"
              />
            </div>
            <Button
              name="Gửi liên hệ"
              wf
              styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
