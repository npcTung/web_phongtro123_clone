const uploader = require("../config/cloudinary.config");
const router = require("express").Router();
const user = require("../controller/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/", [verifyAccessToken], user.getCurrent);
router.put(
  "/",
  [verifyAccessToken],
  uploader.single("avatar"),
  user.updateUser
);

module.exports = router;
