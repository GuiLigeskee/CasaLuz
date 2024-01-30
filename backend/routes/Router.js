const express = require("express");
const router = express();

router.use("/api/admin", require("./AdminRoutes"));

module.exports = router;