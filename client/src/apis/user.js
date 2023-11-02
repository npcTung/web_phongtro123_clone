import axiosConfig from "axiosConfig";

export const apiGetCurrent = () =>
  axiosConfig({
    url: "/user/current",
    method: "get",
  });
