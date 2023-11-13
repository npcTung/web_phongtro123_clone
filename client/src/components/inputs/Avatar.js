import React, { memo, useState } from "react";
import User from "assets/user.png";
import icons from "ultils/icons";

const { FaUpload } = icons;

const Avatar = ({ label, register, validate, id, errors, avatar, name }) => {
  const [isShowAvatar, setIsShowAvatar] = useState(false);

  return (
    <div className="w-full flex flex-col gap-10">
      <label className="capitalize label-text opacity-70">{label}</label>
      <div className="w-full flex items-center justify-center">
        <label
          htmlFor={id}
          className={`relative ${
            errors[id] && "border-error"
          } text-sky-500 cursor-pointer`}
          onMouseEnter={() => setIsShowAvatar(true)}
          onMouseLeave={() => setIsShowAvatar(false)}
        >
          <img
            src={avatar || User}
            alt={name}
            className="w-[200px] h-[200px] rounded-full p-1 bg-white object-cover"
          />
          {isShowAvatar && (
            <div className="absolute inset-0 bg-overlay70 rounded-full text-white flex items-center justify-center text-3xl animate-scale-up-center">
              <FaUpload />
            </div>
          )}
        </label>
        <input type="file" id={id} {...register(id, validate)} hidden />
        {errors[id] && (
          <small className="text-xs pl-2 pt-1 text-red-500">
            {errors[id]?.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default memo(Avatar);
