import React, { memo } from "react";
import Avatar from "assets/user.png";
import icons from "ultils/icons";

const { ImPhone, SiZalo } = icons;

const BoxInfo = ({ user }) => {
  return (
    <div className="w-full bg-yellow-400 rounded-md flex flex-col items-center p-4 gap-2 shadow-md">
      <img
        src={user?.avatar || Avatar}
        alt="avatar"
        className="avatar rounded-full w-16 h-16 object-cover p-1 border border-green-500 bg-white"
      />
      <h3 className="font-medium text-lg">{user?.name}</h3>
      <div className="px-5 py-2 bg-green-500 rounded-md flex items-center justify-center gap-1 w-full hover:bg-green-600 transition-all text-white">
        <span>
          <ImPhone />
        </span>
        <a
          href={`tel:${user?.phone}`}
          target="_blank"
          className="font-bold hover:underline"
        >
          {user?.phone}
        </a>
      </div>
      <div className="px-5 py-2 bg-white border border-black rounded-md flex items-center justify-center gap-1 w-full">
        <span className="p-1 border rounded-full bg-main-blue">
          <SiZalo size={30} color="white" />
        </span>
        <a
          href={`https://zalo.me/${user?.zalo}`}
          target="_blank"
          className="font-bold hover:underline"
        >
          Nhắn zalo
        </a>
      </div>
    </div>
  );
};

export default memo(BoxInfo);
