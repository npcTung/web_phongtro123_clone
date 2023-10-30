const db = require("../models");

const getCategoriesSerivce = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
      });
      resolve({
        success: response ? true : false,
        categoriesData: response ? response : "Failed to get categories",
      });
    } catch (error) {
      reject(error);
    }
  });

const createCategorySerivce = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOrCreate({
        where: { code: body.code },
        defaults: { ...body },
      });
      resolve({
        success: response[1] ? true : false,
        mes: response[1] ? "Created category" : "Failed to create category",
      });
    } catch (error) {
      reject(error);
    }
  });

const updateCategorySerivce = (code, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.update(
        { ...body },
        { where: { code } }
      );
      resolve({
        success: response ? true : false,
        mes: response ? "Updated category" : "Failed to update category",
      });
    } catch (error) {
      reject(error);
    }
  });

const deleteCategorySerivce = (code) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.destroy({ where: { code } });
      resolve({
        success: response ? true : false,
        mes: response ? "Deleted category" : "Failed to delete category",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getCategoriesSerivce,
  createCategorySerivce,
  updateCategorySerivce,
  deleteCategorySerivce,
};
