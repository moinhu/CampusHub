const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/me", authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
