import React, { memo } from "react";

const SortPost = ({ sort, setSort }) => {
  return (
    <div className="flex items-center gap-2 border-b border-main-red pb-4 px-4">
      <label className="label-text">Sắp xêp:</label>
      <span
        className={`label-text-alt bg-gray-200 w-[66px] h-[32px] flex items-center justify-center rounded-md cursor-pointer ${
          sort === 0
            ? "underline font-medium"
            : "hover:underline transition-all"
        }`}
        onClick={() => setSort(0)}
      >
        Mặc định
      </span>
      <span
        className={`label-text-alt bg-gray-200 w-[66px] h-[32px] flex items-center justify-center rounded-md cursor-pointer ${
          sort === 1
            ? "underline font-medium"
            : "hover:underline transition-all"
        }`}
        onClick={() => setSort(1)}
      >
        Mới nhất
      </span>
    </div>
  );
};

export default memo(SortPost);
