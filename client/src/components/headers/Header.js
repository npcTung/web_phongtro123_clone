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
  GrUserAdmin,
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
            <Link
              to={`/${path.MEMBER}/${path.EDIT_ACCOUNT}`}
              className="flex items-center gap-3 mr-10"
              target="_blank"
            >
              <img
                src={currentData?.avatar || Avatar}
                alt={currentData?.name}
                className="w-[40px] h-[40px] object-cover rounded-full p-1 border border-green-500"
              />
              <div className="flex flex-col w-[200px]">
                <span
                  className="line-clamp-1"
                  title={currentData?.name}
                >{`Xin chào, ${currentData?.name}`}</span>
                <span
                  className="line-clamp-1"
                  title={`Mã tài khoản: ${currentData?.id}`}
                >{`MTK: ${currentData?.id}`}</span>
              </div>
            </Link>
            <div className="flex items-center gap-1 cursor-pointer">
              <PiHeartStraight />
              <span className="hover:underline hover:text-main-blue">
                Yêu thích
              </span>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer relative"
              onClick={onShowMenu}
            >
              <GrAppsRounded />
              <span className="hover:underline hover:text-main-blue">
                Quản lý tài khoản
              </span>
              {isShowMenu && (
                <div className="absolute z-10 w-[200px] top-7 p-4 shadow-lg rounded-lg bg-white flex flex-col gap-2">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:underline hover:text-main-orange flex items-center gap-2"
                        key={item?.id}
                        to={`/${path.MEMBER}/${item?.path}`}
                        target="_blank"
                      >
                        {item?.icon}
                        {item?.text}
                      </Link>
                    );
                  })}
                  {+currentData?.role === 2002 && (
                    <Link
                      to={`/${path.ADMIN}/${path.DASH_BOARD}`}
                      className="hover:underline hover:text-main-orange flex items-center gap-2"
                      target="_blank"
                    >
                      <GrUserAdmin />
                      Quản trị viên
                    </Link>
                  )}
                  <span
                    className="cursor-pointer hover:underline hover:text-main-orange flex items-center gap-2"
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
              className="flex gap-1 items-center hover:underline hover:text-main-orange cursor-pointer transition-all"
              onClick={() => goLogin(false)}
            >
              <AiOutlineUserAdd />
              <span>đăng nhập</span>
            </span>
            <span
              className="flex gap-1 items-center hover:underline hover:text-main-orange cursor-pointer transition-all"
              onClick={() => goLogin(true)}
            >
              <IoIosLogIn />
              <span>đăng ký</span>
            </span>
          </>
        )}
        <Link
          to={`/${path.MEMBER}/${path.CREATE_POST}`}
          target="_blank"
          className="flex gap-1 items-center hover:underline transition-all p-2 bg-main-red text-white rounded-md shadow-md cursor-pointer"
        >
          <span>đăng tin mới</span>
          <AiOutlinePlusCircle />
        </Link>
      </div>
    </div>
  );
};

export default withBase(memo(Header));
