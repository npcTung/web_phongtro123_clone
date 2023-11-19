const province = require("../services/province");
const asyncHandler = require("express-async-handler");
const { generateCode } = require("../ultils/common");

const getProvinces = asyncHandler(async (req, res) => {
  const response = await province.getProvincesSerivce();
  return res.status(200).json(response);
});

const createProvince = asyncHandler(async (req, res) => {
  const { value } = req.body;
  if (!value) throw new Error("Missing input");
  req.body.code = generateCode(req.body.value);
  const response = await province.createProvinceSerivce(req.body);
  return res.status(200).json(response);
});

const updateProvince = asyncHandler(async (req, res) => {
  const { code } = req.params;
  req.body.code = generateCode(req.body.value);
  const response = await province.updateProvinceSerivce(code, req.body);
  return res.status(200).json(response);
});

const deleteProvince = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const response = await province.deleteProvinceSerivce(code);
  return res.status(200).json(response);
});

module.exports = {
  getProvinces,
  createProvince,
  updateProvince,
  deleteProvince,
};
