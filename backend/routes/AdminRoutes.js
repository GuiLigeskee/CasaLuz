const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  getCurrentAdmin,
  login,
  update,
  getAdminById,
} = require("../controllers/AdminController");

// Middlewares

// Routes
router.post("/register", register);
router.get("/profile", getCurrentAdmin);
router.post("/login", login);
router.put(
  "/",
  update
);
router.get("/:id", getAdminById);

module.exports = router;