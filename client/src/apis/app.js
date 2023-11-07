import axios from "axios";
import axiosConfig from "axiosConfig";

export const apiGetCategories = () =>
  axiosConfig({
    url: "/category",
    method: "get",
  });

export const apiGetProvince = () =>
  axios({
    url: "https://vapi.vnappmob.com/api/province/",
    method: "get",
  });

export const apiGetDistrict = (provinceId) =>
  axios({
    url: "https://vapi.vnappmob.com/api/province/district/" + provinceId,
    method: "get",
  });

export const apiGetWard = (districtId) =>
  axios({
    url: "https://vapi.vnappmob.com/api/province/ward/" + districtId,
    method: "get",
  });
