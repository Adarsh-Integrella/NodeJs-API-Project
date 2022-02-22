const express = require("express");
const { register, login } = require("../controller/auth");
const router = express.Router();
const { protect, getMe } = require("../middleware/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/getme", protect, getMe);

module.exports = router;
