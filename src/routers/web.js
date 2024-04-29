const express = require("express");
const router = express.Router();
const isLoggedInMiddleware = require('../middleware/checkLogin.js');

const { renderLoginView } = require('../controllers/utilities/loginController');
const { renderHomeView } = require('../controllers/utilities/homeController');

const { renderVacationDaysReportView } = require('../controllers/reports/vacationDayReportController');
const { renderAverageBenefitsReportView } = require('../controllers/reports/averageBenefitsReportController');
const { renderTotalEarningsReportView } = require('../controllers/reports/totalEarningsReportController');

const { renderBirthdayAlertView } = require('../controllers/alerts/birthdayAlertController');
const { renderHirringAnniversaryAlertView } = require('../controllers/alerts/hirringAnniversaryAlertController');
const { renderVacationDaysAlertView } = require('../controllers/alerts/vacationDaysAlertController');

const { renderManageAllEmployeesView } = require('../controllers/managements/employeeController.js');
const { renderManageEmployeeView } = require('../controllers/managements/employeeController.js');

router.get("/", isLoggedInMiddleware, renderHomeView);
router.get("/login", renderLoginView); 

router.get('/VacationDaysReport', isLoggedInMiddleware, renderVacationDaysReportView);
router.get('/AverageBenefitsReport', isLoggedInMiddleware, renderAverageBenefitsReportView);
router.get('/TotalEarningsReport', isLoggedInMiddleware, renderTotalEarningsReportView);

router.get('/BirthdayAlert', isLoggedInMiddleware, renderBirthdayAlertView);
router.get('/HiringAnniversaryAlert', isLoggedInMiddleware, renderHirringAnniversaryAlertView);
router.get('/VacationDaysAlert', isLoggedInMiddleware, renderVacationDaysAlertView);

router.get('/AllEmployeesManagement', isLoggedInMiddleware, renderManageAllEmployeesView);
router.get('/EmployeeManagement', isLoggedInMiddleware, renderManageEmployeeView);

module.exports = router;
