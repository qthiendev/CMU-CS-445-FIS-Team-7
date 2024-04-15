const express = require("express");
const router = express.Router();
const { getHomepage } = require("../controllers/homeController.js");

router.get('/', getHomepage);

module.exports = router;
