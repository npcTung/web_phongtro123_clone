import React, { memo } from "react";
import imageSupport from "assets/support-bg.jpg";
import { contact } from "ultils/constant";
import Button from "components/button/Button";
import withBase from "hocs/withBase";
import path from "ultils/path";

const Footer = ({ navigate }) => {
  return (
    <div className="w-full bg-white py-10 border-8 border-dashed rounded-md border-[#e8eefc]">
      <div className="w-main mx-auto flex flex-col gap-10">
        <img
          src={imageSupport}
          alt="image support footer"
          className="w-full h-full object-contain px-40"
        />
        <h3 className="text-center">
          Liên hệ với chúng tôi nếu bạn cần hỗ trợ:
        </h3>
        <ul className="flex justify-between">
          {contact.map((el, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-1 items-center text-lg font-semibold"
            >
              <span className="text-main-orange">{el.text}</span>
              <span>{el.phone}</span>
              <span>{el.zalo}</span>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-center">
          <Button
            name={"gửi quan hệ"}
            styles={"btn-info text-white"}
            handleOnClick={() => {
              navigate(`/${path.LIEN_HE}`);
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Footer));
