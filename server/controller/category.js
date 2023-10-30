const services = require("../services/category");
const asyncHandler = require("express-async-handler");
const { categoryCode } = require("../ultils/common");

const getCategories = asyncHandler(async (req, res) => {
  const response = await services.getCategoriesSerivce();
  return res.status(200).json(response);
});

const createCategory = asyncHandler(async (req, res) => {
  const { value, header, subheader } = req.body;
  if (!(value && header && subheader)) throw new Error("Missing input");
  req.body.code = categoryCode(req.body.value);
  const response = await services.createCategorySerivce(req.body);
  return res.status(200).json(response);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { code } = req.params;
  req.body.code = categoryCode(req.body.value);
  const response = await services.updateCategorySerivce(code, req.body);
  return res.status(200).json(response);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const response = await services.deleteCategorySerivce(code);
  return res.status(200).json(response);
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
