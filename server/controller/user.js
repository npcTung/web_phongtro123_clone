const services = require("../services/user");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

const getCurrent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const response = await services.getCurrent(id);
  return res.status(200).json(response);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { name, phone, email } = req.body;
  const data = { name, phone, email };
  if (req.file) {
    data.avatar = req.file.path;
    data.filenameAvatar = req.file.filename;
  }
  if (!(id && name && email && phone)) {
    cloudinary.uploader.destroy(req.file.filename);
    throw new Error("Missing input!");
  }
  const response = await services.updateUser(data, id);
  return res.status(200).json(response);
});

module.exports = { getCurrent, updateUser };
