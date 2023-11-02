import React, { memo } from "react";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const Modal = ({ children, dispatch }) => {
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="fixed inset-0 bg-overlay60 z-[70] flex justify-center items-center"
    >
      {children}
    </div>
  );
};

export default withBase(memo(Modal));
