const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  login,
  update,
  getAdminById,
} = require("../controllers/AdminController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  adminCreateValidation,
  loginValidation,
  adminUpdateValidation,
} = require("../middlewares/adminValidation");
const authGuard = require("../middlewares/authGuard");

// Routes
router.post(
  "/register",
  authGuard,
  adminCreateValidation(),
  validate,
  register
);
router.post("/login", loginValidation(), validate, login);
router.put("/", authGuard, adminUpdateValidation(), validate, update);
router.get("/:id", authGuard, getAdminById);

module.exports = router;
