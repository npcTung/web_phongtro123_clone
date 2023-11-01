import React, { memo } from "react";

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className="shadow-md hover:shadow-lg rounded-bl-lg rounded-br-lg cursor-pointer text-main-blue text-center hover:text-main-orange transition-all">
      <img
        src={image}
        alt={name}
        className="w-[200px] h-[110px] object-cover rounded-tl-lg rounded-tr-lg"
      />
      <span className="font-medium p-2">{name}</span>
    </div>
  );
};

export default memo(ProvinceBtn);
