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
const { imagesUpload } = require("../middlewares/imagesUpload")
const {
    adsInsertValidation,
    adsUpdateValidation,
} = require("../middlewares/adsValidation");

// Routes
router.post(
    "/",
    authGuard,
    imagesUpload.array("images"),
    adsInsertValidation(),
    validate,
    insertAds
);
router.put(
    "/:id",
    authGuard,
    imagesUpload.single("images"),
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