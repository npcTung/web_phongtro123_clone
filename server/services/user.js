const db = require("../models");
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");

//GET CURRENT
const getCurrent = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: [
            "password",
            "refreshToken",
            "passwordChangeAt",
            "passwordResetToken",
            "passwordResetExpires",
            "registerToken",
          ],
        },
      });
      resolve({
        success: response ? true : false,
        currentData: response ? response : "Failed to get user",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id } });
      const response = await db.User.update({ ...payload }, { where: { id } });
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

const getAllUsersService = ({ page, limit, order, name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT;
      const attributes = {
        exclude: [
          "password",
          "refreshToken",
          "passwordChangeAt",
          "passwordResetToken",
          "passwordResetExpires",
          "registerToken",
        ],
      };
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      queries.attributes = attributes;
      if (order) queries.order = [order];
      if (name) query.name = { [Op.substring]: name };
      const response = await db.User.findAndCountAll({
        where: query,
        ...queries,
      });
      resolve({
        success: response ? true : false,
        usersData: response ? response : "Cannot find Users",
      });
    } catch (error) {
      reject(error);
    }
  });

const deleteUserService = (uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const includes = [
        { model: db.User, as: "user", attributes: ["filenameAvatar"] },
      ];
      queries.attributes = [
        "id",
        "attributesId",
        "overviewId",
        "fileNameImages",
      ];
      queries.include = includes;
      const post = await db.Post.findAll({
        where: { userId: uid },
        ...queries,
      });
      const response = await db.User.destroy({ where: { id: uid } });
      if (response) {
        post?.map(async (el) => {
          await db.Post.destroy({ where: { id: el.id } });
          await db.Attribute.destroy({ where: { id: el.attributesId } });
          await db.Overview.destroy({ where: { id: el.overviewId } });
          cloudinary.uploader.destroy(el.user?.filenameAvatar);
          cloudinary.api.delete_resources(
            JSON.parse(el?.fileNameImages)?.map((el) => el)
          );
        });
      }
      resolve({
        success: response ? true : false,
        mes: response ? "user deleted" : "can not delete user",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateUserByAdminService = (uid, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(body, { where: { id: uid } });
      resolve({
        success: response[0] > 0 ? true : false,
        mes: response[0] > 0 ? "Updated user." : "Can not update user",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getCurrent,
  updateUser,
  getAllUsersService,
  deleteUserService,
  updateUserByAdminService,
};
