const uploader = require("../config/cloudinary.config");
const router = require("express").Router();
const post = require("../controller/post");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post(
  "/",
  [verifyAccessToken],
  uploader.fields([{ name: "images", maxCount: 30 }]),
  post.createNewPost
);
router.get("/", post.getPosts);
router.get("/limit-user", [verifyAccessToken], post.getPostsLimitUser);
router.get("/:pid", post.getCurrentPort);
router.delete("/:pid", [verifyAccessToken], post.deletePost);
router.put(
  "/:pid",
  [verifyAccessToken],
  uploader.fields([{ name: "images", maxCount: 30 }]),
  post.updatePost
);

module.exports = router;
