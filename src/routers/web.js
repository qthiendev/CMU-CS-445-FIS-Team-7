const express = require("express");
const router = express.Router();
// const { getHomepage, recordsetFilter } = require("../controllers/homeController.js");
// const homeController = require('../controllers/homeController');
// router.get('/', getHomepage);
// router.post('/filter', homeController.recordsetFilter);

const {getReportVD} = require('../controllers/rVacationDayController');
const rvcController = require('../controllers/rVacationDayController');
router.get('/VacationDayReport', getReportVD);

module.exports = router;
