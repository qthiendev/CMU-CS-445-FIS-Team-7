const express = require("express");
const router = express.Router();
const isLoggedInMiddleware = require('../middleware/checkLogin.js');

const { renderLoginView, tryLogin } = require('../controllers/utilities/loginController');
const { renderHomeView } = require('../controllers/utilities/homeController');

const { renderVacationDaysReportView } = require('../controllers/reports/vacationDayReportController');
const { renderAverageBenefitsReportView } = require('../controllers/reports/averageBenefitsReportController');
const { renderTotalEarningsReportView } = require('../controllers/reports/totalEarningsReportController');

const { renderBirthdayAlertView } = require('../controllers/alerts/birthdayAlertController');
const { renderHirringAnniversaryAlertView } = require('../controllers/alerts/hirringAnniversaryAlertController');
const { renderVacationDaysAlertView } = require('../controllers/alerts/vacationDaysAlertController');

const { renderInformationView } = require('../controllers/managements/getInformationController.js');
const { renderSpecificInformationView } = require('../controllers/managements/getSpecificInformationController.js');
const { editInformation, renderInformationSpecificEdit } = require('../controllers/managements/editSpecificInformationController.js');

const { addNewPersonalInformation, renderAddPersonalPage } = require('../controllers/managements/addPersonalController.js');
const { addNewEmployeeInformation } = require('../controllers/managements/addEmployeeController.js');

const { deleteEmployee } = require('../controllers/managements/deleteEmployeeController.js');
const { detelePersonal } = require('../controllers/managements/deletePersonalController.js');

const accountController =require('../controllers/account/accounts.js');

const logout=require('../controllers/utilities/logoutController.js');
router.get("/", isLoggedInMiddleware, renderHomeView);
router.get("/Login", renderLoginView);
router.get("/TryLogin", tryLogin);

router.get('/VacationDaysReport', isLoggedInMiddleware, renderVacationDaysReportView);
router.get('/AverageBenefitsReport', isLoggedInMiddleware, renderAverageBenefitsReportView);
router.get('/TotalEarningsReport', isLoggedInMiddleware, renderTotalEarningsReportView);

router.get('/BirthdayAlert', isLoggedInMiddleware, renderBirthdayAlertView);
router.get('/HiringAnniversaryAlert', isLoggedInMiddleware, renderHirringAnniversaryAlertView);
router.get('/VacationDaysAlert', isLoggedInMiddleware, renderVacationDaysAlertView);

router.get('/Information', isLoggedInMiddleware, renderInformationView);
router.get('/Information/Specific', isLoggedInMiddleware, renderSpecificInformationView);
router.get('/Information/Specific/Edit', isLoggedInMiddleware, renderInformationSpecificEdit);
router.get('/EditInformation', isLoggedInMiddleware, editInformation);

router.get('/Information/Add', isLoggedInMiddleware, renderAddPersonalPage);
router.get('/AddNewPersonal', isLoggedInMiddleware, addNewPersonalInformation);
router.get('/AddNewEmployee', isLoggedInMiddleware, addNewEmployeeInformation);

router.get('/DeleteEmployee', isLoggedInMiddleware, deleteEmployee);
router.get('/DetelePersonal', isLoggedInMiddleware, detelePersonal);

router.get('/Roles', isLoggedInMiddleware,accountController.roles)
router.get('/Permissions', isLoggedInMiddleware,accountController.permissions)
router.get('/Accounts', isLoggedInMiddleware,accountController.accounts)


router.get('/logout', logout);
module.exports = router;
