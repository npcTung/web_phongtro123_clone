const db = require("../models");
const cloudinary = require("cloudinary").v2;

//GET CURRENT
const getCurrent = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id } });
      const response = await db.User.update(payload, {
        where: { id },
      });
      if (payload.avatar && response[0] <= 0)
        cloudinary.uploader.destroy(payload.filename);
      if (payload.avatar && response[0] > 0 && user.avatar)
        cloudinary.uploader.destroy(user.filenameAvatar);
      resolve({
        success: response[0] > 0 ? true : false,
        mes: response[0] > 0 ? "Updated" : "Failed to update user",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { getCurrent, updateUser };
