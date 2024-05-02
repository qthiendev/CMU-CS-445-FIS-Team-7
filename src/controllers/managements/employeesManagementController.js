const { getAllEmployeesInformation } = require('../../services/managements/getAllEmployeesInformation');
const { getInformationByPersonalID } = require('../../services/managements/getSpecificEmployeeInformation');
const { setSpecificEmployeeInformation } = require('../../services/managements/setSpecificEmployeeInformation');

const renderManageAllEmployeesView = async (req, res) => {
    try {
        let data = await getAllEmployeesInformation();

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
        let data = await getInformationByPersonalID(id);

        res.render(
            "manageEditEmployeePage.ejs",
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

const renderSpecificEmployeeInformationView = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await getInformationByPersonalID(id);

        res.render(
            "manageSpecificEmployeePage.ejs",
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
            BENEFIT_PLANS_ID,
            EMPLOYMENT_CODE,
            EMPLOYMENT_STATUS,
            HIRE_DATE_FOR_WORKING,
            WORKERS_COMP_CODE,
            TERMINATION_DATE,
            REHIRE_DATE_FOR_WORKING,
            LAST_REVIEW_DATE,
            NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH,
            idPay_Rates,
        } = req.query;

        // Update the employee information
        await setSpecificEmployeeInformation(
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
            BENEFIT_PLANS_ID,
            EMPLOYMENT_CODE,
            EMPLOYMENT_STATUS,
            HIRE_DATE_FOR_WORKING,
            WORKERS_COMP_CODE,
            TERMINATION_DATE,
            REHIRE_DATE_FOR_WORKING,
            LAST_REVIEW_DATE,
            NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH,
            idPay_Rates,
        );

        // Redirect back to the manageEmployeePage.ejs view
        res.redirect('/EmployeeManagement?id=' + id);
    } catch (err) {
        console.log('[System] Error at employeesManagementController.js | setEmployeeInformation: ', err);
    }
}

const addPersonalInformation = async (req, res) => {

}

const addEmployeeInformation = async (req, res) =>{
    
} 

module.exports = {
    renderManageAllEmployeesView,
    renderSpecificEmployeeInformationView,
    renderManageEmployeeView,
    setEmployeeInformation,
    addPersonalInformation,
    addEmployeeInformation
};