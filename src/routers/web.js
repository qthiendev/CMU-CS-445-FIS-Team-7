const express = require("express");
const router = express.Router();
const { getHomepage,recordsetFilter } = require("../controllers/homeController.js");
const homeController = require('../controllers/homeController');
router.get('/', getHomepage);
router.post('/filter', homeController.recordsetFilter);
module.exports = router;
