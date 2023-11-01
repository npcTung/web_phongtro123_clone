import React, { memo } from "react";
import { location } from "ultils/constant";
import { ProvinceBtn } from "components";

const Province = () => {
  return (
    <div className="flex items-center justify-center gap-5 py-5">
      {location.map((el) => {
        return <ProvinceBtn key={el.id} image={el.image} name={el.name} />;
      })}
    </div>
  );
};

export default memo(Province);
