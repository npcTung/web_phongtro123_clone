import React, { memo, useEffect, useState } from "react";
import icons from "ultils/icons";
import * as apis from "apis";

const { GrNext, IoCloseCircleSharp } = icons;

const ItemSidebarProvince = ({ title, provinceCode, setProvinceCode }) => {
  const [province, setProvince] = useState(null);

  const fetchProvince = async () => {
    const response = await apis.apiGetProvinces();
    if (response.success) setProvince(response.provincesData);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  return (
    <div className="p-4 rounded-md bg-white shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col gap-3">
        {province?.length > 0 &&
          province.map((item) => (
            <div
              key={item.code}
              className={`flex gap-2 items-center border-b border-dashed`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`flex gap-1 items-center cursor-pointer ${
                    provinceCode === item.code
                      ? "text-main-orange"
                      : "hover:text-main-orange transition-all"
                  }`}
                  onClick={() => setProvinceCode(item.code)}
                >
                  <GrNext size={12} />
                  <span className="py-1">{item.value}</span>
                </span>
                {provinceCode === item.code && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setProvinceCode(null)}
                  >
                    <IoCloseCircleSharp />
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(ItemSidebarProvince);
