const express = require("express");
const router = express.Router();
const { renderManageAllEmployeesView } = require('../controllers/managements/employeeController.js')

const { renderLoginView } = require('../controllers/utilities/loginController');
const { renderHomeView } = require('../controllers/utilities/homeController');

const { renderVacationDaysReportView } = require('../controllers/reports/vacationDayReportController');
const { renderAverageBenefitsReportView } = require('../controllers/reports/averageBenefitsReportController');
const { renderTotalEarningsReportView } = require('../controllers/reports/totalEarningsReportController');

const { renderBirthdayAlertView } = require('../controllers/alerts/birthdayAlertController');
const { renderHirringAnniversaryAlertView } = require('../controllers/alerts/hirringAnniversaryAlertController');
const { renderVacationDaysAlertView } = require('../controllers/alerts/vacationDaysAlertController');

const isLoggedInMiddleware = require('../middleware/checkLogin.js');

router.get("/", isLoggedInMiddleware, renderHomeView);
router.get("/login", renderLoginView); 

router.get('/VacationDaysReport', isLoggedInMiddleware, renderVacationDaysReportView);
router.get('/AverageBenefitsReport', isLoggedInMiddleware, renderAverageBenefitsReportView);
router.get('/TotalEarningsReport', isLoggedInMiddleware, renderTotalEarningsReportView);

router.get('/BirthdayAlert', isLoggedInMiddleware, renderBirthdayAlertView);
router.get('/HiringAnniversaryAlert', isLoggedInMiddleware, renderHirringAnniversaryAlertView);
router.get('/VacationDaysAlert', isLoggedInMiddleware, renderVacationDaysAlertView);

router.get('/EmployeesManagement', isLoggedInMiddleware, renderManageAllEmployeesView)

module.exports = router;
