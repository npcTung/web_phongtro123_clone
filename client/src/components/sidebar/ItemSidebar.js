import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { createSlug } from "ultils/helpers";

const { GrNext } = icons;

const ItemSidebar = ({ title, content }) => {
  return (
    <div className="p-4 rounded-md bg-white shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col gap-3">
        {content?.length > 0 &&
          content.map((item) => {
            return (
              <NavLink
                to={`/${createSlug(item.value)}`}
                key={item.code}
                className={({ isActive }) =>
                  `flex gap-2 items-center border-b border-dashed ${
                    isActive
                      ? "text-main-orange"
                      : "hover:text-main-orange transition-all"
                  }`
                }
              >
                <GrNext size={12} />
                <span className="py-1">{item.value}</span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default withBase(memo(ItemSidebar));
