import axiosConfig from "axiosConfig";

export const apiGetPosts = (params) =>
  axiosConfig({
    url: "/post",
    method: "get",
    params,
  });

export const apiGetPost = (pid) =>
  axiosConfig({
    url: "/post/" + pid,
    method: "get",
  });

export const apiCreatePost = (data) =>
  axiosConfig({
    url: "/post/",
    method: "post",
    data,
  });

export const apiGetPostsLimitUser = () =>
  axiosConfig({
    url: "/post/limit-user",
    method: "get",
  });

export const apiDeletePost = (pid) =>
  axiosConfig({
    url: "/post/" + pid,
    method: "delete",
  });
