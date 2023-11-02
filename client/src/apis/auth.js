import axiosConfig from "axiosConfig";

export const apiFinalRegister = (token) =>
  axiosConfig({
    url: "/auth/final-register/" + token,
    method: "put",
  });

export const apiRegister = (data) =>
  axiosConfig({
    url: "/auth/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axiosConfig({
    url: "/auth/login",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axiosConfig({
    url: "/auth/forgot-password",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axiosConfig({
    url: "/auth/reset-password",
    method: "put",
    data,
  });
