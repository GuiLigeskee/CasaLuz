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
router.get("/", getAllAds);
router.get("/admin/:id", getAdminAds);
router.get("/:id", getAdsById);

// Filtros de pesquisa:
// router.get("/filter/title", getByTitle);
// router.get("/filter/district", getByDistrict);
// router.get("filter/city", getByCity);
// router.get("/filter/type", getByTypeOfRealty);
// router.get("/filter/method", getByMethodOfSale);
// router.get("/filter/price", getByPrice);
// router.get("/filter/space", getByLandMeasurement);
router.get("/filter/search", searchAds);

module.exports = router;
