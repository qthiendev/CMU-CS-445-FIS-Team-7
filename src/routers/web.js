const express = require("express");
const router = express.Router();

const {getReportVD} = require('../controllers/VacationDayReportController');
const {getReportAB} = require('../controllers/AverageBenefitsReportController');
const {getReportTE} = require('../controllers/TotalEarningsReportController');

router.get('/VacationDayReport', getReportVD);
router.get('/AverageBenefitsReport', getReportAB);
router.get('/TotalEarningsReport', getReportTE);

module.exports = router;
