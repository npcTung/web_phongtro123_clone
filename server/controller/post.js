const postService = require("../services/post");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

const createNewPost = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { categoryCode, title, label } = req.body;
  const images = req?.files?.images?.map((el) => el.path);
  if (!(categoryCode || id || title || label)) {
    cloudinary.api.delete_resources(
      req?.files?.images?.map((el) => el.filename)
    );
    throw new Error("Missing input!");
  }
  req.body.slug = slugify(title);
  if (images) {
    req.body.images = images;
    req.body.fileNameImages = req?.files?.images?.map((el) => el.filename);
  }
  const response = await postService.createNewPostService(req.body, id);
  return res.status(200).json(response);
});

const getPosts = asyncHandler(async (req, res) => {
  const { page, ...query } = req.query;
  const response = await postService.getPostsService(page, query);
  return res.status(200).json(response);
});

const getCurrentPort = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await postService.getPostService(pid);
  return res.status(200).json(response);
});

const deletePost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await postService.deletePostService(pid);
  return res.status(200).json(response);
});

const getPostLimit = asyncHandler(async (req, res) => {
  const { page, ...queries } = req.query;
  const response = await postService.getPostsLimitService(page, queries);
  return res.status(200).json(response);
});

const getNewPosts = asyncHandler(async (req, res) => {
  const response = await postService.getNewPostService();
  return res.status(200).json(response);
});

const getPostsLimitUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { page, ...queries } = req.query;
  const response = await postService.getPostsLimitUserService(
    page,
    id,
    queries
  );
  return res.status(200).json(response);
});

const updatePost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { id } = req.user;
  const data = { ...req.body };
  if (!pid) {
    cloudinary.api.delete_resources(req.files?.map((el) => el.filename));
    throw new Error("Missing input");
  }
  if (req?.files) {
    data.images = req?.files?.images?.map((el) => el.path);
    data.fileNameImages = req?.files?.images?.map((el) => el.filename);
  }
  data.slug = slugify(data.title);
  const response = await postService.updatePostService(pid, id, req.body);
  return res.status(200).json(response);
});

module.exports = {
  createNewPost,
  getPosts,
  deletePost,
  getCurrentPort,
  getPostLimit,
  getNewPosts,
  getPostsLimitUser,
  updatePost,
};
