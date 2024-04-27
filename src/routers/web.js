const express = require("express");
const router = express.Router();

const { renderLoginView } = require('../controllers/utilities/loginController');
const { renderHomeView } = require('../controllers/utilities/homeController');

const { renderVacationDaysReportView } = require('../controllers/reports/vacationDayReportController');
const { renderAverageBenefitsReportView } = require('../controllers/reports/averageBenefitsReportController');
const { renderTotalEarningsReportView } = require('../controllers/reports/totalEarningsReportController');

const { renderBirthdayAlertView } = require('../controllers/alerts/birthdayAlertController')
const { renderHirringAnniversaryAlertView } = require('../controllers/alerts/hirringAnniversaryAlertController')
const { renderVacationDaysAlertView } = require('../controllers/alerts/vacationDaysAlertController')

const { renderManageAllEmployeesView } = require('../controllers/managements/employeeController');

router.get("/", renderHomeView);
router.get("/Login", renderLoginView);

router.get('/VacationDaysReport', renderVacationDaysReportView);
router.get('/AverageBenefitsReport', renderAverageBenefitsReportView);
router.get('/TotalEarningsReport', renderTotalEarningsReportView);

router.get('/BirthdayAlert', renderBirthdayAlertView);
router.get('/HiringAnniversaryAlert', renderHirringAnniversaryAlertView);
router.get('/VacationDaysAlert', renderVacationDaysAlertView);

router.get('/EmployeesManagement', renderManageAllEmployeesView);

module.exports = router;
