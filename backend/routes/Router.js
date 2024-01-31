const express = require("express");
const router = express();

router.use("/api/admin", require("./AdminRoutes"));
router.use("/api/ads", require("./AdsRoutes"));

module.exports = router;