const express = require("express");
const router = express.Router();

// Controllers
const {
  insertAds,
  deleteAds,
  getHomeAds,
  getAdsById,
  updateAds,
  searchAds,
} = require("../controllers/AdsController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imagesUpload } = require("../middlewares/imagesUpload");
const { convertFiles } = require("../middlewares/convertFiles");
const {
  adsInsertValidation,
  adsUpdateValidation,
} = require("../middlewares/adsValidation");

// Routes
router.post(
  "/",
  authGuard,
  imagesUpload.array("images"),
  convertFiles,
  adsInsertValidation(),
  validate,
  insertAds
);
router.put(
  "/:id",
  authGuard,
  imagesUpload.array("images"),
  convertFiles,
  adsUpdateValidation(),
  validate,
  updateAds
);
router.delete("/:id", authGuard, deleteAds);
router.get("/", getHomeAds);
router.get("/:id", getAdsById);
router.get("/filter/search", searchAds);

module.exports = router;
