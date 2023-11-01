import axiosConfig from "axiosConfig";

export const apiGetCategories = () =>
  axiosConfig({
    url: "/category",
    method: "get",
  });
