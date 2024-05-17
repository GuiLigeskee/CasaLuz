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
const { convertFiles } = require("../middlewares/convertFiles");
const {
  depoimentInsertValidation,
  depoimentUpdateValidation,
} = require("../middlewares/depoimentValidation");
const validate = require("../middlewares/handleValidation");

// Routes
router.post(
  "/",
  authGuard,
  imagesUpload.array("images"),
  convertFiles,
  depoimentInsertValidation(),
  validate,
  insertDepoiment
);
router.put(
  "/:id",
  authGuard,
  imagesUpload.array("images"),
  convertFiles,
  depoimentUpdateValidation(),
  validate,
  updateDepoiment
);
router.delete("/:id", authGuard, deleteDepoiment);
router.get("/", getAllDepoiments);
router.get("/getDepoiment/:id", getDepoimentById);
router.get("/getAdminDepoiments/:id", getAdminDepoiments);

module.exports = router;
