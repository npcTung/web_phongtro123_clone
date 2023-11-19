const db = require("../models");

const getProvincesSerivce = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
      });
      resolve({
        success: response ? true : false,
        provincesData: response ? response : "Failed to get provinces",
      });
    } catch (error) {
      reject(error);
    }
  });

const createProvinceSerivce = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findOrCreate({
        where: { code: body.code },
        defaults: { ...body },
      });
      resolve({
        success: response[1] ? true : false,
        mes: response[1] ? "Created province" : "Failed to create province",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateProvinceSerivce = (code, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.update(
        { ...body },
        { where: { code } }
      );
      resolve({
        success: response ? true : false,
        mes: response ? "Updated province" : "Failed to update province",
      });
    } catch (error) {
      reject(error);
    }
  });

const deleteProvinceSerivce = (code) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.destroy({ where: { code } });
      resolve({
        success: response ? true : false,
        mes: response ? "Deleted province" : "Failed to delete province",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getProvincesSerivce,
  createProvinceSerivce,
  updateProvinceSerivce,
  deleteProvinceSerivce,
};
