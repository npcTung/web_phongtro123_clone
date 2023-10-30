const router = require("express").Router();
const categories = require("../controller/category");
const { isAdmin, verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/", categories.getCategories);
router.post("/", [verifyAccessToken, isAdmin], categories.createCategory);
router.put("/:code", [verifyAccessToken, isAdmin], categories.updateCategory);
router.delete(
  "/:code",
  [verifyAccessToken, isAdmin],
  categories.deleteCategory
);

module.exports = router;
