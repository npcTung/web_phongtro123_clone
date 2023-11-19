import axiosConfig from "axiosConfig";

export const apiGetCategories = () =>
  axiosConfig({
    url: "/category",
    method: "get",
  });

export const apiGetProvinces = () =>
  axiosConfig({
    url: "/province",
    method: "get",
  });
