const router = require("express").Router();
const provinces = require("../controller/province");
const { isAdmin, verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/", provinces.getProvinces);
router.post("/", [verifyAccessToken, isAdmin], provinces.createProvince);
router.put("/:code", [verifyAccessToken, isAdmin], provinces.updateProvince);
router.delete("/:code", [verifyAccessToken, isAdmin], provinces.deleteProvince);

module.exports = router;
