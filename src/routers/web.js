const express = require("express");
const router = express.Router();
// const { getHomepage, recordsetFilter } = require("../controllers/homeController.js");
// const homeController = require('../controllers/homeController');
// router.get('/', getHomepage);
// router.post('/filter', homeController.recordsetFilter);

const {getReportVD} = require('../controllers/VacationDayReportController');
const {getReportAB} = require('../controllers/AverageBenefitsReportController');
const {getReportTE} = require('../controllers/TotalEarningsReportController');

router.get('/VacationDayReport', getReportVD);
router.get('/AverageBenefitsReport', getReportAB);
router.get('/TotalEarningsReport', getReportTE);

module.exports = router;
