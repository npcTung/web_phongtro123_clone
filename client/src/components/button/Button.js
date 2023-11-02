import React, { memo } from "react";

const Button = ({
  name,
  type = "button",
  iconAfter,
  iconBefore,
  styles,
  wf,
  handleOnClick,
}) => {
  return (
    <div className={wf ? "w-full" : "w-fit"}>
      <button
        type={type}
        className={`uppercase btn ${styles ? styles : "text-white"} w-full`}
        onClick={() => handleOnClick && handleOnClick()}
      >
        <span className="flex items-center gap-1">
          {iconAfter && <span>{iconAfter}</span>}
          <span>{name}</span>
          {iconBefore && <span>{iconBefore}</span>}
        </span>
      </button>
    </div>
  );
};

export default memo(Button);
