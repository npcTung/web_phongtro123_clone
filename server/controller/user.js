const user = require("../services/user");
const asyncHandler = require("express-async-handler");

const getCurrent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const response = await user.getCurrent(id);
  return res.status(200).json(response);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (req.file) {
    req.body.avatar = req.file.path;
    req.body.filenameAvatar = req.file.filename;
  }
  const response = await user.updateUser(req.body, id);
  return res.status(200).json(response);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const response = await user.getAllUsersService(req.query);
  return res.status(200).json(response);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) throw new Error("Missing input");
  const response = await user.deleteUserService(uid);
  return res.status(200).json(response);
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) throw new Error("Missing input");
  const response = await user.updateUserByAdminService(uid, req.body);
  return res.status(200).json(response);
});

module.exports = {
  getCurrent,
  updateUser,
  getAllUsers,
  deleteUser,
  updateUserByAdmin,
};
