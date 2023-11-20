import React, { memo, useCallback, useEffect, useState } from "react";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import icons from "ultils/icons";
import {
  Button,
  InputForm,
  InputImages,
  Loading,
  MarkDownEditer,
  Select,
} from "components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as apis from "apis";
import { toast } from "react-toastify";
import { getBase64, validate } from "ultils/helpers";
import data from "data/db.json";

const { MdOutlineClear } = icons;

const targetData = ["Tất cả", "Nam", "Nữ"];

const UpdatePost = ({ dispatch, dataPost, rerender }) => {
  const [provincesData, setProvincesData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [wardData, setWardData] = useState(null);
  const [payload, setPayload] = useState(null);
  const [invalidFields, setInvalidFields] = useState(null);
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const [preview, setPreview] = useState({ images: [] });
  const [address, setAddress] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

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

  const handleUpdatePost = async (data) => {
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
      finalPayload.images =
        data.images?.length === 0 ? preview.images : data.images;
      for (let image of finalPayload.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiUpdatePost(dataPost.id, formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) toast.success("Sửa sản phẩm thành công");
      else toast.error(response.mes);
      resetData();
      rerender();
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
          "Định dạng ảnh sai\nChỉ nhận định dạng file có đuôi .png hoặc .jpg"
        );
      } else {
        const base64 = await getBase64(file);
        imagesPreview.push({ name: file.name, path: base64 });
      }
    }
    if (imagesPreview?.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    const dataAddress = dataPost?.address?.split(":")[1]?.split(",");
    if (dataPost && provincesData)
      setProvinceId(
        provincesData?.find((el) => el.name === dataAddress[3])?.idProvince
      );
    if (dataPost && districtData)
      setDistrictId(
        districtData?.find((el) => el.name === dataAddress[2])?.idDistrict
      );
    if (dataPost && wardData)
      setWardId(wardData?.find((el) => el.name === dataAddress[1])?.idCommune);
  }, [dataPost, provincesData, districtData, wardData]);

  useEffect(() => {
    const dataAddress = dataPost?.address?.split(":")[1]?.split(",")[0];
    const description = JSON.parse(dataPost && dataPost?.description);
    reset({
      title: dataPost?.title,
      number: dataAddress.split(" ")[dataAddress.split(" ").length - 1],
      price: dataPost?.attributes?.price.split("triệu/tháng")[0],
      acreage: dataPost?.attributes?.acreage.split("m2")[0],
      province: provinceId,
      district: districtId,
      ward: wardId,
      target: dataPost?.overviews?.target,
      category: dataPost?.categoryCode,
    });
    setPayload({
      description:
        description.length === 1 ? description[0] : description.join(", "),
    });
    setPreview({ images: JSON?.parse(dataPost && dataPost?.images) });
  }, [dataPost, provinceId, districtId, wardId]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images")?.length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    setProvincesData(data.province);
    if (watch("province"))
      setDistrictData(
        data.district.filter((el) => el.idProvince === watch("province"))
      );
    if (watch("district"))
      setWardData(
        data.commune.filter((el) => el.idDistrict === watch("district"))
      );
  }, [watch("province"), watch("district")]);

  useEffect(() => {
    const province = provincesData?.find(
      (el) => el.idProvince === watch("province")
    )?.name;
    const district = districtData?.find(
      (el) => el.idDistrict === watch("district")
    )?.name;
    const ward = wardData?.find((el) => el.idCommune === watch("ward"))?.name;
    setAddress({
      number: watch("number") || "",
      province: province || "",
      district: district || "",
      ward: ward || "",
    });
  }, [watch("number"), watch("province"), watch("district"), watch("ward")]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-md w-4/5 h-4/5 p-5"
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b pb-5">
        <span className="capitalize">{`sửa thông tin sản phẩm "${dataPost?.title?.toLowerCase()}"`}</span>
        <span
          className="cursor-pointer"
          onClick={() => {
            resetData();
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
          }}
        >
          <MdOutlineClear />
        </span>
      </h1>
      <div className="w-full h-[94%] overflow-y-auto">
        <form
          onSubmit={handleSubmit(handleUpdatePost)}
          className="flex flex-col gap-5 py-5 px-2"
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
                  code: el.idProvince,
                  value: el.name,
                }))}
                wf
                disabled
              />
              <Select
                label={"Quận/Huyện"}
                id={"district"}
                register={register}
                validate={{ required: "Điền thông tin bắt buộc." }}
                errors={errors}
                options={districtData?.map((el) => ({
                  code: el.idDistrict,
                  value: el.name,
                }))}
                wf
                disabled
              />
              <Select
                label={"Phường/Xã"}
                id={"ward"}
                register={register}
                errors={errors}
                options={wardData?.map((el) => ({
                  code: el.idCommune,
                  value: el.name,
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
                value={payload?.description}
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
                options={targetData.map((el) => ({
                  code: el,
                  value: el,
                }))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-medium">Hình ảnh</h3>
            <InputImages
              label={"Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn"}
              id={"images"}
              register={register}
              errors={errors}
              preview={preview}
              validate={{ required: "Điền thông tin bắt buộc." }}
            />
          </div>
          <Button
            name={"Sửa sản phẩm"}
            wf
            styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(memo(UpdatePost));
