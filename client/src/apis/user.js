import axiosConfig from "axiosConfig";

export const apiGetCurrent = () =>
  axiosConfig({
    url: "/user/current",
    method: "get",
  });

export const apiUpdateUser = (data) =>
  axiosConfig({
    url: "/user",
    method: "put",
    data,
  });

export const apiGetAllUser = (params) =>
  axiosConfig({
    url: "/user",
    method: "get",
    params,
  });

export const apiDeleteUser = (uid) =>
  axiosConfig({
    url: "/user/" + uid,
    method: "delete",
  });

export const apiUpdateUserByAdmin = (uid, data) =>
  axiosConfig({
    url: "/user/" + uid,
    method: "put",
    data,
  });
