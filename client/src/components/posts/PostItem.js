import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createSlug,
  formatMoney,
  formatTime,
  renderStarFromNumber,
} from "ultils/helpers";
import NoPost from "assets/logo-image.png";
import icons from "ultils/icons";
import Avatar from "assets/user.png";
import DOMPurify from "dompurify";

const { PiHeartStraight, PiHeartStraightFill } = icons;

const PostItem = ({ data }) => {
  const { categories } = useSelector((state) => state.app);
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const category = categories?.find(
    (el) => el.code === data.categoryCode
  ).value;
  const images = JSON.parse(data && data.images);
  const description = JSON.parse(data && data.description);

  return (
    <div className="w-full p-4 border-b border-main-red grid grid-cols-10 gap-5">
      <div className="relative col-span-4 h-[240px]">
        <Link
          to={`/${createSlug(category)}/${data.id}/${data.slug}`}
          className="rounded-lg h-full"
        >
          {images.length > 0 &&
            images
              ?.filter((i, index) =>
                [...Array(1).keys()].some((i) => i === index)
              )
              ?.map((i, index) => {
                return (
                  <img
                    key={index || NoPost}
                    src={i}
                    alt={data.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                );
              })}
          <span className="text-white bg-overlay50 rounded-md py-1 px-2 text-sm absolute bottom-2 left-2">
            {`${images.length} ảnh`}
          </span>
        </Link>
        <span
          className="text-2xl absolute bottom-2 right-2 cursor-pointer"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <PiHeartStraightFill color="red" />
          ) : (
            <PiHeartStraight color="white" />
          )}
        </span>
      </div>
      <div className="col-span-6 flex flex-col gap-2">
        <Link
          to={`/${createSlug(category)}/${data.id}/${data.slug}`}
          className="flex gap-1"
        >
          <span className="flex items-center gap-1 text-yellow-500">
            {renderStarFromNumber(data.star)}
          </span>
          <span
            className="uppercase font-semibold text-main-red hover:underline text-sm line-clamp-1"
            title={data.title}
          >
            {data.title}
          </span>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex gap-5">
            <span className="font-bold text-green-500">
              {`${formatMoney(
                data?.attributes?.price.split("triệu/tháng")[0]
              )} VNĐ`}
            </span>
            <span>{data.attributes.acreage?.split("m2")[0]} m2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">{`${
              data.address.split(",")[data.address.split(",").length - 1]
            }, ${
              data.address.split(",")[data.address.split(",").length - 2]
            }`}</span>
            <span className="capitalize text-sm opacity-60">
              {formatTime(data.createdAt)}
            </span>
          </div>
        </div>
        {description?.length > 1 && (
          <div className="text-sm line-clamp-4 text-overlay50">
            {description}
          </div>
        )}
        {description?.length === 1 && (
          <div
            className="text-sm flex flex-col gap-2 text-overlay50"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description[0]),
            }}
          />
        )}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={data.user.avatar || Avatar}
              alt={data.user.name}
              className={`w-[40px] h-[40px] object-contain rounded-full p-1 border ${
                data.user.isBlocked === 0
                  ? "border-green-500"
                  : "border-main-red"
              }`}
            />
            <span className="text-overlay50 capitalize">{data.user.name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to={`https://zalo.me/${data.user.zalo}`}
              className="py-1 px-2 rounded-md border text-center border-main-blue text-sm text-main-blue hover:bg-main-blue hover:text-white transition-all"
            >
              Nhắn zalo
            </Link>
            <Link
              to={`tel:${data.user.phone}`}
              className="py-1 px-2 rounded-md border border-main-blue text-sm bg-main-blue text-white"
            >
              {`Gọi ${data.user.phone}`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostItem);
