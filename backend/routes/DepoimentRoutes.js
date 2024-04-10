const express = require("express");
const router = express.Router();

// Controllers
const {
  insertDepoiment,
  deleteDepoiment,
  updateDepoiment,
  getDepoimentById,
  getAllDepoiments,
  getAdminDepoiments,
} = require("../controllers/DepoimentController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const { imagesUpload } = require("../middlewares/imagesUpload");

// Routes
router.post("/", authGuard, imagesUpload.array("images"), insertDepoiment);
router.delete("/:id", authGuard, deleteDepoiment);
router.put("/:id", authGuard, updateDepoiment);
router.get("/", getAllDepoiments);
router.get("/getDepoiment/:id", getDepoimentById);
router.get("/getAdminDepoiments/:id", getAdminDepoiments);

module.exports = router;
