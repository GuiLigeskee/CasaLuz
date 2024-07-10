const express = require("express");
const router = express.Router();

// Controllers
const {
  insertDepoiment,
  deleteDepoiment,
  getHomeDepoiments,
} = require("../controllers/DepoimentController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const { imagesUpload } = require("../middlewares/imagesUpload");
const { convertFiles } = require("../middlewares/convertFiles");
const {
  depoimentInsertValidation,
  // depoimentUpdateValidation,
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
router.delete("/:id", authGuard, deleteDepoiment);
router.get("/", getHomeDepoiments);

module.exports = router;
