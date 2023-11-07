import React, { memo } from "react";
import icons from "ultils/icons";

const { FaUpload } = icons;

const InputImages = ({ label, register, validate, preview, id, errors }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="capitalize label-text opacity-70">{label}</span>
      <div className="w-full">
        <label
          htmlFor={id}
          className={`lable label-text flex flex-col gap-2 w-full h-[200px] border-[3px] items-center justify-center border-dashed rounded cursor-pointer ${
            errors[id] && "border-error"
          } text-sky-500`}
        >
          <FaUpload size={40} />
          <span>Thêm ảnh</span>
        </label>
        <input
          type="file"
          id={id}
          {...register(id, validate)}
          hidden
          multiple
        />
        {errors[id] && (
          <small className="text-xs pl-2 pt-1 text-red-500">
            {errors[id]?.message}
          </small>
        )}
      </div>
      {preview?.images.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 w-full">
          {preview?.images?.map((el, idx) => (
            <div key={idx} className="w-[24%] h-[300px] flex justify-center">
              <img
                key={idx}
                src={typeof el === "object" ? el.path : el}
                alt={el.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(InputImages);
