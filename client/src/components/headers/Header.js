import React, { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import path from "ultils/path";
import icons from "ultils/icons";
import Logo from "assets/logo-phongtro.svg";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import Avatar from "assets/user.png";
import { menuManage } from "ultils/constant";
import { logout } from "store/user/appSlice";

const {
  AiOutlineUserAdd,
  IoIosLogIn,
  AiOutlinePlusCircle,
  PiHeartStraight,
  GrAppsRounded,
  BsBoxArrowInLeft,
} = icons;

const Header = ({ navigate, dispatch }) => {
  const { isLoggedIn, currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  const onShowMenu = useCallback(() => {
    setIsShowMenu(!isShowMenu);
  }, [isShowMenu]);

  return (
    <div className="w-main mx-auto py-2 flex items-center justify-between">
      <Link to={`/${path.HOME}`}>
        <img src={Logo} alt="Logo-phongtro123" className="w-[250px]" />
      </Link>
      <div className="flex items-center gap-5 capitalize">
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 w-[250px] cursor-pointer mr-10">
              <img
                src={currentData?.avatar || Avatar}
                alt={currentData?.name}
                className="w-[40px] h-[40px] object-contain rounded-full p-1 border border-green-500"
              />
              <div className="flex flex-col">
                <span
                  className="line-clamp-1"
                  title={currentData?.name}
                >{`Xin chào, ${currentData?.name}`}</span>
                <span
                  className="line-clamp-1"
                  title={`Mã tài khoản: ${currentData?.id}`}
                >{`MTK: ${currentData?.id}`}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
              <PiHeartStraight />
              <span>Yêu thích</span>
            </div>
            <div
              className="flex items-center gap-1 hover:underline cursor-pointer relative"
              onClick={onShowMenu}
            >
              <GrAppsRounded />
              <span>Quản lý tài khoản</span>
              {isShowMenu && (
                <div className="absolute z-10 w-[200px] top-7 p-4 shadow-lg rounded-lg bg-white flex flex-col gap-2">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:underline flex items-center gap-2"
                        key={item?.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item?.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer hover:underline flex items-center gap-2"
                    onClick={() => {
                      dispatch(logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <BsBoxArrowInLeft />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <span
              className="flex gap-1 items-center hover:underline cursor-pointer transition-all"
              onClick={() => goLogin(false)}
            >
              <AiOutlineUserAdd />
              <span>đăng nhập</span>
            </span>
            <span
              className="flex gap-1 items-center hover:underline cursor-pointer transition-all"
              onClick={() => goLogin(true)}
            >
              <IoIosLogIn />
              <span>đăng ký</span>
            </span>
          </>
        )}
        <span className="flex gap-1 items-center hover:underline transition-all p-2 bg-main-red text-white rounded-md shadow-md cursor-pointer">
          <span>đăng tin mới</span>
          <AiOutlinePlusCircle />
        </span>
      </div>
    </div>
  );
};

export default withBase(memo(Header));
