import React, { memo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSlug } from "ultils/helpers";
import path from "ultils/path";

const Navigation = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-full bg-main-blue text-white h-10">
      <div className="w-main mx-auto flex items-center h-full">
        <NavLink
          to={path.HOME}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-main-red"
                : "bg-main-blue hover:bg-main-red transition-all"
            } px-2 h-full flex items-center`
          }
        >
          Trang chủ
        </NavLink>
        {categories?.map((el) => (
          <NavLink
            key={el.code}
            to={`/${createSlug(el.value)}`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-main-red"
                  : "bg-main-blue hover:bg-main-red transition-all"
              } px-2 h-full flex items-center`
            }
          >
            {el.value}
          </NavLink>
        ))}
        <NavLink
          to={`${path.LIEN_HE}`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-main-red"
                : "bg-main-blue hover:bg-main-red transition-all"
            } px-2 h-full flex items-center`
          }
        >
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};

export default memo(Navigation);
