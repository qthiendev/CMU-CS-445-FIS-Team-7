const express = require("express");
const router = express.Router();

const {renderVacationDaysReportView} = require('../controllers/reports/vacationDayReportController');
const {renderAverageBenefitsReportView} = require('../controllers/reports/averageBenefitsReportController');
const {renderTotalEarningsReportView} = require('../controllers/reports/totalEarningsReportController');

router.get('/VacationDaysReport', renderVacationDaysReportView);
router.get('/AverageBenefitsReport', renderAverageBenefitsReportView);
router.get('/TotalEarningsReport', renderTotalEarningsReportView);

module.exports = router;
