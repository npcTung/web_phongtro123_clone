const uploader = require("../config/cloudinary.config");
const router = require("express").Router();
const user = require("../controller/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/current", [verifyAccessToken], user.getCurrent);
router.get("/", [verifyAccessToken, isAdmin], user.getAllUsers);
router.put(
  "/",
  [verifyAccessToken],
  uploader.single("avatar"),
  user.updateUser
);
router.put("/:uid", [verifyAccessToken, isAdmin], user.updateUserByAdmin);
router.delete("/:uid", [verifyAccessToken, isAdmin], user.deleteUser);

module.exports = router;
