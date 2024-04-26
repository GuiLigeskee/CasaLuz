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
  getByTitle,
  getByTypeOfRealty,
  getByMethodOfSale,
  getByPrice,
  getByLandMeasurement,
  getByDistrict,
  getByCity,
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
router.get("/:id", getAdsById);

// Filtros de pesquisa:
router.get("/filter/title", getByTitle);
router.get("/filter/district", getByDistrict);
router.get("filter/city", getByCity);
router.get("/filter/type", getByTypeOfRealty);
router.get("/filter/method", getByMethodOfSale);
router.get("/filter/price", getByPrice);
router.get("/filter/space", getByLandMeasurement);

module.exports = router;
