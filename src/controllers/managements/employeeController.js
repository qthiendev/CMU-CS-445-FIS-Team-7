const { getAllInformation } = require('../../services/managements/processEmployee');
const { getInformation } = require('../../services/managements/processEmployee');
const { setInformation } = require('../../services/managements/processEmployee');

const renderManageAllEmployeesView = async (req, res) => {
    try {
        let data = await getAllInformation();

        res.render(
            "manageAllEmployeesPage.ejs",
            {
                data
            }
        );
        console.log('[System] employeeController.js | Rendered manageAllEmployeesPage.');
    }
    catch (err) {
        console.log('[System] Error at employeeController.js | renderManageAllEmployeesView: ', err);
    }
}

const renderManageEmployeeView = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await getInformation(id);

        res.render(
            "manageEmployeePage.ejs",
            {
                data,
                id
            }
        );
        console.log('[System] employeeController.js | Rendered manageEmployeePage.');
    }
    catch (err) {
        console.log('[System] Error at employeeController.js | renderManageEmployeeView: ', err);
    }
}

const setEmployeeInformation = async (req, res) => {
    try {
        console.log(req.query)
        const {
            id,
            CURRENT_FIRST_NAME,
            CURRENT_LAST_NAME,
            CURRENT_MIDDLE_NAME,
            BIRTH_DATE,
            SOCIAL_SECURITY_NUMBER,
            DRIVERS_LICENSE,
            CURRENT_ADDRESS_1,
            CURRENT_ADDRESS_2,
            CURRENT_CITY,
            CURRENT_COUNTRY,
            CURRENT_ZIP,
            CURRENT_GENDER,
            CURRENT_PHONE_NUMBER,
            CURRENT_PERSONAL_EMAIL,
            CURRENT_MARITAL_STATUS,
            ETHNICITY,
            SHAREHOLDER_STATUS,
            BENEFIT_PLANS_ID
        } = req.query;

        // Update the employee information
        await setInformation(
            id,
            CURRENT_FIRST_NAME,
            CURRENT_LAST_NAME,
            CURRENT_MIDDLE_NAME,
            BIRTH_DATE,
            SOCIAL_SECURITY_NUMBER,
            DRIVERS_LICENSE,
            CURRENT_ADDRESS_1,
            CURRENT_ADDRESS_2,
            CURRENT_CITY,
            CURRENT_COUNTRY,
            CURRENT_ZIP,
            CURRENT_GENDER,
            CURRENT_PHONE_NUMBER,
            CURRENT_PERSONAL_EMAIL,
            CURRENT_MARITAL_STATUS,
            ETHNICITY,
            SHAREHOLDER_STATUS,
            BENEFIT_PLANS_ID
        );

        // Redirect back to the manageEmployeePage.ejs view
        res.redirect('/EmployeeManagement?id=' + id);
    } catch (err) {
        console.log('[System] Error at employeeController.js | setEmployeeInformation: ', err);
    }
}

module.exports = {
    renderManageAllEmployeesView,
    renderManageEmployeeView,
    setEmployeeInformation
};