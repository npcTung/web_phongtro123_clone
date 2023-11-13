import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputForm,
  InputImages,
  Loading,
  MarkDownEditer,
  PageHeader,
  Select,
} from "components";
import * as apis from "apis";
import { useSelector } from "react-redux";
import { getBase64, validate } from "ultils/helpers";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const targetData = ["Tất cả", "Nam", "Nữ"];

const CreatePost = ({ dispatch }) => {
  const [provincesData, setProvincesData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [wardData, setWardData] = useState(null);
  const [payload, setPayload] = useState(null);
  const [invalidFields, setInvalidFields] = useState(null);
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const [preview, setPreview] = useState({ images: [] });
  const [address, setAddress] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const fetchProvinces = async () => {
    const response = await apis.apiGetProvince();
    if (response.data.results) setProvincesData(response.data.results);
  };

  const fetchDistrict = async (provinceId) => {
    const response = await apis.apiGetDistrict(provinceId);
    if (response.data.results) setDistrictData(response.data.results);
  };

  const fetchWard = async (districtId) => {
    const response = await apis.apiGetWard(districtId);
    if (response.data.results) setWardData(response.data.results);
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const resetData = () => {
    reset();
    setPayload(null);
    setPreview({ images: [] });
    setAddress(null);
  };

  const handleCreatePost = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (data.number || data.district || data.province)
      data.address = `Địa chỉ: ${address?.number ? `${address?.number},` : ""}${
        address?.ward ? `${address?.ward},` : ""
      }${address?.district ? `${address?.district},` : ""}${
        address?.province ? `${address?.province}` : ""
      }`;
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      finalPayload.categoryCode = data.category;
      finalPayload.province = address?.province;
      finalPayload.label = `${
        categories?.find((el) => el.code === data.category).value
      } ${address?.district}`;
      finalPayload.target = data.target;
      finalPayload.type = categories?.find(
        (el) => el.code === data.category
      ).value;
      delete finalPayload.name;
      delete finalPayload.phone;
      delete finalPayload.ward;
      delete finalPayload.district;
      delete finalPayload.category;
      delete finalPayload.number;
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.images)
        for (let image of finalPayload.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiCreatePost(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success("Thêm thông tin phòng trọn mới thành công!");
        resetData();
      } else {
        toast.error(response.mes);
        resetData();
      }
    }
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        toast.warning(
          "Định dạng ảnh sai\nChỉ nhận định dạng file có đuôi .png hoặc .jpg",
          { theme: "colored" }
        );
        return;
      } else {
        const base64 = await getBase64(file);
        imagesPreview.push({ name: file.name, path: base64 });
      }
    }
    if (imagesPreview?.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("images")?.length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    fetchProvinces();
    if (watch("province")) fetchDistrict(watch("province"));
    if (watch("district")) fetchWard(watch("district"));
  }, [watch("province"), watch("district")]);

  useEffect(() => {
    const province = provincesData?.find(
      (el) => el.province_id === watch("province")
    )?.province_name;
    const district = districtData?.find(
      (el) => el.district_id === watch("district")
    )?.district_name;
    const ward = wardData?.find(
      (el) => el.ward_id === watch("ward")
    )?.ward_name;
    setAddress({
      number: watch("number") || "",
      province: province || "",
      district: district || "",
      ward: ward || "",
    });
  }, [watch("number"), watch("province"), watch("district"), watch("ward")]);

  return (
    <div className="w-full flex flex-col gap-0 py-5 pr-5">
      <PageHeader
        category={"quản lý người dùng"}
        header={"Đăng tin mới"}
        fixed
      />
      <div className="w-full h-[93px]"></div>
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="flex flex-col gap-5 pt-5"
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium">Địa chỉ cho thuê</h3>
          <div className="w-full flex items-center justify-between gap-5">
            <Select
              label={"Tỉnh/Thành phố"}
              id={"province"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              options={provincesData?.map((el) => ({
                code: el.province_id,
                value: el.province_name,
              }))}
              wf
            />
            <Select
              label={"Quận/Huyện"}
              id={"district"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              options={districtData?.map((el) => ({
                code: el.district_id,
                value: el.district_name,
              }))}
              wf
            />
            <Select
              label={"Phường/Xã"}
              id={"ward"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              options={wardData?.map((el) => ({
                code: el.ward_id,
                value: el.ward_name,
              }))}
              wf
            />
          </div>
          <InputForm
            label={"Số nhà"}
            id={"number"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            errors={errors}
            classInput={"bg-white"}
          />
          <InputForm
            label={"Địa chỉ chính xác"}
            id={"address"}
            register={register}
            errors={errors}
            wf
            disabled
            classInput={"bg-white"}
            defaultValue={`${address?.number ? `${address?.number},` : ""}${
              address?.ward ? `${address?.ward},` : ""
            }${address?.district ? `${address?.district},` : ""}${
              address?.province ? `${address?.province}` : ""
            }`}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium">Thông tin mô tả</h3>
          <div className="w-full flex flex-col gap-5">
            <Select
              label={"Loại chuyên mục"}
              id={"category"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              options={categories}
            />
            <InputForm
              label={"Tiêu đề"}
              id={"title"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              wf
              classInput={`bg-white`}
            />
            <MarkDownEditer
              label={"mô tả"}
              name={"description"}
              changeValue={changeValue}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputForm
              label={"Thông tin liên hệ"}
              id={"name"}
              register={register}
              disabled
              defaultValue={currentData?.name}
              errors={errors}
              classInput={`bg-white`}
            />
            <InputForm
              label={"Điện thoại"}
              id={"phone"}
              register={register}
              disabled
              defaultValue={currentData?.phone}
              errors={errors}
              classInput={`bg-white`}
            />
            <InputForm
              label={"Giá cho thuê(đồng/tháng)"}
              id={"price"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              classInput={`bg-white`}
            />
            <InputForm
              label={"Diện tích(m2)"}
              id={"acreage"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              classInput={`bg-white`}
            />
            <Select
              label={"Đối tượng cho thuê"}
              id={"target"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              errors={errors}
              options={targetData.map((el) => ({ code: el, value: el }))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium">Hình ảnh</h3>
          <InputImages
            label={"Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn"}
            id={"images"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            errors={errors}
            preview={preview}
          />
        </div>
        <Button
          name={"Tạo sản phẩm mới"}
          wf
          styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default withBase(CreatePost);
