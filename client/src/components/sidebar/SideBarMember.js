import React, { memo } from "react";
import Logo from "assets/logo-phongtro.svg";
import { Link, NavLink } from "react-router-dom";
import path from "ultils/path";
import Avatar from "assets/user.png";
import { menuManage } from "ultils/constant";
import withBase from "hocs/withBase";
import { logout } from "store/user/appSlice";
import icons from "ultils/icons";

const { BsBoxArrowInLeft } = icons;

const SideBarMember = ({ data, dispatch }) => {
  return (
    <div className="fixed top-0 bottom-0 border-r left-0 right-[81%] flex flex-col items-start gap-5 bg-white shadow-md">
      <Link to={`/${path.HOME}`} className="w-full py-3 px-5 border-b">
        <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
      </Link>
      <div className="flex items-end gap-3 px-5">
        <img
          src={data?.avatar || Avatar}
          alt={data?.name}
          className={`w-[50px] h-[50px] object-contain rounded-full p-1 border ${
            data?.isBlocked === 0 ? "border-green-500" : "border-main-red"
          }`}
        />
        <div className="flex flex-col text-sm">
          <span className="font-bold">{data?.name}</span>
          <span>{data?.phone}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 px-5">
        <label className="whitespace-nowrap">Mã thành viên:</label>
        <span className="line-clamp-1 font-semibold">{data?.id}</span>
      </div>
      <div className="w-full flex flex-col gap-2 border-y">
        {menuManage.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                `px-5 flex items-center gap-3 py-2 ${
                  isActive
                    ? "text-main-orange"
                    : "hover:text-main-orange transition-all"
                } border-b`
              }
              key={item.id}
              to={item.path}
            >
              {item?.icon}
              {item?.text}
            </NavLink>
          );
        })}
        <span
          className="flex items-center gap-2 px-5 py-2 hover:text-main-orange transition-all cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          <BsBoxArrowInLeft />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default withBase(memo(SideBarMember));
