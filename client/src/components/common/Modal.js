import React, { memo } from "react";

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-overlay60 z-[70] flex justify-center items-center">
      {children}
    </div>
  );
};

export default memo(Modal);
