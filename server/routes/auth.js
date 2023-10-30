const router = require("express").Router();
const auth = require("../controller/auth");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/refresh-token", auth.refreshAccessToken);
router.get("/logout", auth.logout);
router.post("/forgot-password", auth.forgotPassword);
router.put("/reset-password", auth.resetPassword);
router.put("/final-register/:token", auth.finalregister);

module.exports = router;
