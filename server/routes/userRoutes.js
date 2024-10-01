const express = require("express");
const router = express.Router();
const {
	userLogin,
	userLogout,
	userRegister,
	googleLogin,
} = require("../controllers/userController");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/google/login", googleLogin);

module.exports = router;
