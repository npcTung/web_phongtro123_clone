import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSlug, formatTime } from "ultils/helpers";

const indexs = [0];
const SItem = ({ data }) => {
  const { categories } = useSelector((state) => state.app);
  const image = JSON.parse(data.images);
  const category = categories?.find(
    (el) => el.code === data.categoryCode
  ).value;

  return (
    <div className="w-full border-b border-gray-300 p-2 flex gap-3">
      <Link
        to={`/${createSlug(category)}/${data.id}/${createSlug(data.title)}`}
        className="flex gap-3"
      >
        {image.length > 0 &&
          image
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <div key={index} className="w-[80px] h-[60px]">
                  <img
                    src={i}
                    alt={data.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              );
            })}
        <div className="flex flex-col w-full">
          <h3 className="text-main-blue line-clamp-1 text-sm hover:text-main-orange transition-all capitalize">
            {data.title.toLowerCase()}
          </h3>
          <div className="flex items-center justify-between flex-auto gap-1">
            <span className="font-medium text-green-500 text-sm">
              {data?.attributes?.price}
            </span>
            <span className="text-overlay40 text-sm">
              {formatTime(data?.createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(SItem);
