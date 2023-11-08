import React, { memo } from "react";
import { SplideImg } from "components";
import { formatMoney, formatTime, renderStarFromNumber } from "ultils/helpers";
import icons from "ultils/icons";
import DOMPurify from "dompurify";

const {
  FaLocationDot,
  IoPricetagsOutline,
  TbBoxModel2Off,
  BiTime,
  PiHashLight,
} = icons;

const Post = ({ data }) => {
  const description = JSON.parse(data && data?.description);
  return (
    <div className="col-span-7 bg-white rounded-md flex flex-col gap-3 shadow-md h-fit">
      <SplideImg images={data && JSON.parse(data?.images)} alt={data?.title} />
      <h1 className="px-5 flex gap-1 items-center text-2xl text-main-red font-semibold">
        {data?.title}
      </h1>
      <span className="px-5 flex items-center gap-1 text-yellow-500">
        {renderStarFromNumber(data?.star)}
      </span>
      <div className="flex gap-1 items-center px-5">
        <label className="label">Chuyên mục:</label>
        <span className="font-semibold text-main-blue">
          {data?.overviews?.area}
        </span>
      </div>
      <div className="flex items-center gap-1 px-5">
        <FaLocationDot color="#1266dd" />
        <span>{data?.address}</span>
      </div>
      <div className="flex items-center justify-between px-5 w-4/5">
        <div className="flex items-center gap-1 text-overlay30">
          <IoPricetagsOutline />
          <span className="text-green-500 font-semibold text-xl">
            {`${formatMoney(
              data?.attributes?.price.split("triệu/tháng")[0]
            )} VNĐ`}
          </span>
        </div>
        <div className="flex items-center gap-1 text-overlay30">
          <TbBoxModel2Off />
          <span className="text-black">
            {data?.attributes?.acreage.split("m2")[0]} m2
          </span>
        </div>
        <div className="flex items-center gap-1 text-overlay30">
          <BiTime />
          <span className="text-black">{formatTime(data?.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1 text-overlay30">
          <PiHashLight />
          <span className="text-black">{data?.attributes?.hashtag}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5">
        <h3 className="text-xl font-semibold">Thông tin mô tả</h3>
        {description?.length > 1 && (
          <span className="flex flex-col gap-2">
            {description?.map((el, idx) => (
              <span key={idx}>{el}</span>
            ))}
          </span>
        )}
        {description?.length === 1 && (
          <div
            className="text-sm flex flex-col gap-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description[0]),
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 px-5">
        <h3 className="text-xl font-semibold">Đặc điểm tin đăng</h3>
        <table className="table table-zebra">
          <tbody>
            <tr>
              <th>Mã tin:</th>
              <td>{data?.overviews?.code}</td>
            </tr>
            <tr>
              <th>Khu vực:</th>
              <td>{data?.overviews?.area}</td>
            </tr>
            <tr>
              <th>Loại tin rao:</th>
              <td>{data?.overviews?.type}</td>
            </tr>
            <tr>
              <th>Đối tượng thuê:</th>
              <td>{data?.overviews?.target}</td>
            </tr>
            <tr>
              <th>Gói tin:</th>
              <td>{data?.overviews?.bonus}</td>
            </tr>
            <tr>
              <th>Ngày đăng:</th>
              <td>{data?.overviews?.created}</td>
            </tr>
            <tr>
              <th>Ngày hết hạn:</th>
              <td>{data?.overviews?.expired}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 px-5">
        <h3 className="text-xl font-semibold">Đặc điểm tin đăng</h3>
        <table className="table table-zebra">
          <tbody>
            <tr>
              <th>Liên hệ:</th>
              <td>{data?.user?.name}</td>
            </tr>
            <tr>
              <th>Điện thoại:</th>
              <td>{data?.user?.phone}</td>
            </tr>
            <tr>
              <th>Zalo:</th>
              <td>{data?.user?.zalo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(Post);
