const express = require("express");
const router = express.Router();

// Controllers
const {
  insertAds,
  deleteAds,
  getAllAds,
  getAdminAds,
  getAdsById,
  updateAds,
  searchAds,
} = require("../controllers/AdsController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imagesUpload } = require("../middlewares/imagesUpload");
const { processFiles } = require("../middlewares/processFiles");
const {
  adsInsertValidation,
  adsUpdateValidation,
} = require("../middlewares/adsValidation");

// Routes
router.post(
  "/",
  authGuard,
  imagesUpload.array("images"),
  processFiles,
  adsInsertValidation(),
  validate,
  insertAds
);
router.put(
  "/:id",
  authGuard,
  imagesUpload.array("images"),
  adsUpdateValidation(),
  validate,
  updateAds
);
router.delete("/:id", authGuard, deleteAds);
router.get("/", getAllAds);
router.get("/admin/:id", getAdminAds);
router.get("/search", searchAds);
router.get("/:id", getAdsById);

module.exports = router;
