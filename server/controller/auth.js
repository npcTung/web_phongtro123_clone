const authSevice = require("../services/auth");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { name, phone, password, email } = req.body;
  if (!(name && phone && password && email)) throw new Error("Missing input!");
  else {
    const response = await authSevice.registerService(req.body);
    return res.status(200).json(response);
  }
});

const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) throw new Error("Missing input!");
  else {
    const response = await authSevice.loginService(req.body);
    res.cookie("refreshToken", response.newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(response);
  }
});

const finalregister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const response = await authSevice.finalregisterService(token);
  return res.status(200).json(response);
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!(cookie && cookie.refreshToken))
    throw new Error("No refresh token in cookie");
  else {
    const response = await authSevice.refreshAccessTokenService(cookie);
    return res.status(200).json(response);
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && cookie.refreshToken) throw new Error("No refresh is cookies");
  const response = await authSevice.logoutService(cookie.refreshToken);
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  return res.status(200).json(response);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const response = await authSevice.forgotPasswordService(email);
  return res.status(200).json(response);
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!(password || token)) throw new Error("Missing email or token");
  const response = await authSevice.resetPasswordService(req.body);
  return res.status(200).json(response);
});

module.exports = {
  register,
  login,
  finalregister,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
};
