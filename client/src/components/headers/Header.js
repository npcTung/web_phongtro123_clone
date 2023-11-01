import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import path from "ultils/path";
import icons from "ultils/icons";
import Logo from "assets/logo-phongtro.svg";
import withBase from "hocs/withBase";

const { PiHeartStraight, AiOutlineUserAdd, IoIosLogIn, AiOutlinePlusCircle } =
  icons;

const Header = ({ navigate }) => {
  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  return (
    <div className="w-main mx-auto py-2 flex items-center justify-between">
      <Link to={`/${path.HOME}`}>
        <img src={Logo} alt="Logo-phongtro123" className="w-[250px]" />
      </Link>
      <div className="flex items-center gap-5 capitalize">
        <Link
          to={`/${path.MY_WISHLIST}`}
          className="flex gap-1 items-center hover:underline transition-all"
        >
          <PiHeartStraight />
          <span>yêu thích</span>
        </Link>
        <Link
          to={`/${path.LOGIN}`}
          className="flex gap-1 items-center hover:underline transition-all"
          onClick={() => goLogin(false)}
        >
          <AiOutlineUserAdd />
          <span>đăng nhập</span>
        </Link>
        <Link
          to={`/${path.LOGIN}`}
          className="flex gap-1 items-center hover:underline transition-all"
          onClick={() => goLogin(true)}
        >
          <IoIosLogIn />
          <span>đăng ký</span>
        </Link>
        <Link
          to={"#"}
          className="flex gap-1 items-center hover:underline transition-all p-2 bg-main-red text-white rounded-md shadow-md"
        >
          <span>đăng tin mới</span>
          <AiOutlinePlusCircle />
        </Link>
      </div>
    </div>
  );
};

export default withBase(memo(Header));
