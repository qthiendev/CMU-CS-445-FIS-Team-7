const { addEmployeeInformation } = require('../../services/managements/addEmployeeInformation')

const addNewEmployeeInformation = async (req, res) => {
    try {
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
        } = req.query;

        console.log(req.query);
        await addEmployeeInformation(PERSONAL_ID,
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
            BENEFIT_PLANS_ID,);
        res.redirect(`/Information/Specific?PERSONAL_ID=${PERSONAL_ID}`);
    } catch (err) {
        console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE:', err);
        res.redirect(`/Information/Specific?PERSONAL_ID=${PERSONAL_ID}`);
    }
}

module.exports = { addNewEmployeeInformation };