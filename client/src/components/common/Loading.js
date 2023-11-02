import React, { memo } from "react";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return <BarLoader color="#36d7b7" />;
};

export default memo(Loading);
