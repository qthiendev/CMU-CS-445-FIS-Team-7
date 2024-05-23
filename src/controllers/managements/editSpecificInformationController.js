const { editSpecificInformation } = require('../../services/managements/editSpecificInformation');
const { getInformationByPersonalID } = require('../../services/managements/getSpecificInformation');

const editInformation = async (req, res) => {
    const {
        PERSONAL_ID,
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

    try {
        if ((PERSONAL_ID && PERSONAL_ID != '')
            && (CURRENT_FIRST_NAME && CURRENT_FIRST_NAME != '')
            && (CURRENT_LAST_NAME && CURRENT_LAST_NAME != '')
            && (SOCIAL_SECURITY_NUMBER && SOCIAL_SECURITY_NUMBER != '')
            && (BENEFIT_PLANS_ID && BENEFIT_PLANS_ID != '')
            && (idPay_Rates && idPay_Rates != '')) {
            await editSpecificInformation(
                PERSONAL_ID,
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
        }
    } catch (err) {
        console.log('[System] Error at employeesManagementController.js | setEmployeeInformation: ', err);
    } finally {
        res.redirect('/Information/Specific/Edit?PERSONAL_ID=' + PERSONAL_ID);
    }
}

const renderInformationSpecificEdit = async (req, res) => {
    try {
        let id = req.query.PERSONAL_ID;
        let data = await getInformationByPersonalID(id);

        res.render(
            "manageInformationSpecificEditPage.ejs",
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

module.exports = {
    editInformation,
    renderInformationSpecificEdit
};