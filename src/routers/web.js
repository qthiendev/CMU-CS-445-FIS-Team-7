const express = require("express");
const router = express.Router();

const authController=require('../controllers/auth/authController.js')

const middlewareAuth=require("../middleware/checkLogin.js")

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


router.get('/login', authController.login)
router.post('/login', authController.loginPost)
router.get('/logout', authController.logout)

router.get('/HomePage',middlewareAuth.requireAuth, authController.homePage)


router.get('/VacationDaysReport',middlewareAuth.requireAuth,  renderVacationDaysReportView);
router.get('/AverageBenefitsReport',middlewareAuth.requireAuth,  renderAverageBenefitsReportView);
router.get('/TotalEarningsReport',middlewareAuth.requireAuth,  renderTotalEarningsReportView);

router.get('/BirthdayAlert',middlewareAuth.requireAuth,  renderBirthdayAlertView);
router.get('/HiringAnniversaryAlert',middlewareAuth.requireAuth,  renderHirringAnniversaryAlertView);
router.get('/VacationDaysAlert',middlewareAuth.requireAuth,  renderVacationDaysAlertView);

router.get('/Information',middlewareAuth.requireAuth,  renderInformationView);
router.get('/Information/Specific',middlewareAuth.requireAuth,  renderSpecificInformationView);
router.get('/Information/Specific/Edit',middlewareAuth.requireAuth,  renderInformationSpecificEdit);
router.get('/EditInformation',middlewareAuth.requireAuth,  editInformation);

router.get('/Information/Add',middlewareAuth.requireAuth,  renderAddPersonalPage);
router.get('/AddNewPersonal',middlewareAuth.requireAuth,  addNewPersonalInformation);
router.get('/AddNewEmployee',middlewareAuth.requireAuth,  addNewEmployeeInformation);

router.get('/DeleteEmployee',middlewareAuth.requireAuth,  deleteEmployee);
router.get('/DetelePersonal',middlewareAuth.requireAuth,  detelePersonal);

router.get('/Roles',middlewareAuth.requireAuth, accountController.roles)
router.get('/Roles/Edit/:id',middlewareAuth.requireAuth, accountController.edit)
router.patch('/Roles/Edit/:id',middlewareAuth.requireAuth, accountController.editRoles)
router.get('/Roles/Create',middlewareAuth.requireAuth, accountController.create)
router.post('/Roles/Create',middlewareAuth.requireAuth, accountController.createPost)
router.delete('/Roles/Deleted/:id', accountController.deleteRole)




router.get('/Permissions',middlewareAuth.requireAuth, accountController.permission)
router.patch('/Permissions',middlewareAuth.requireAuth, accountController.permissionPatch)



router.get('/Accounts',middlewareAuth.requireAuth, accountController.accounts)
router.get('/Accounts/Create',middlewareAuth.requireAuth, accountController.createAccount)
router.post('/Accounts/Create',middlewareAuth.requireAuth, accountController.createAccountPost)
router.get('/Accounts/Edit/:id',middlewareAuth.requireAuth, accountController.editAccount)
router.patch('/Accounts/Edit/:id',middlewareAuth.requireAuth, accountController.editAccountPost)
router.delete('/Accounts/Deleted/:id', accountController.deleteAccount)





module.exports = router;
