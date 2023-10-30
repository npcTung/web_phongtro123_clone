const insertService = require("../services/insert");
const asyncHandler = require("express-async-handler");

const insertServices = asyncHandler(async (req, res) => {
  const response = await insertService.insertServices();
  return res.status(200).json(response);
});

const insertCategory = asyncHandler(async (req, res) => {
  const response = await insertService.insertCategoryServices();
  return res.status(200).json(response);
});

module.exports = { insertServices, insertCategory };
