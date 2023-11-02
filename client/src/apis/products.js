import axiosConfig from "axiosConfig";

export const apiGetProducts = (params) =>
  axiosConfig({
    url: "/post",
    method: "get",
    params,
  });
