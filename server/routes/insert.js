const router = require("express").Router();
const insert = require("../controller/insert");

router.post("/insert", insert.insertServices);
router.post("/insert-category", insert.insertCategory);

module.exports = router;
