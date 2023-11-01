import axiosConfig from "axiosConfig";

export const apiGetProducts = () =>
  axiosConfig({
    url: "/post",
    method: "get",
  });
