const { addEmployeeInformation } = require('../../services/managements/addEmployeeInformation');

const addNewEmployeeInformation = async (req, res) => {
    const {
        PERSONAL_ID,
        CURRENT_FIRST_NAME,
        CURRENT_LAST_NAME,
        SOCIAL_SECURITY_NUMBER
    } = req.query;

    try {
        console.log('Received request:', req.query);
        await addEmployeeInformation(PERSONAL_ID, CURRENT_FIRST_NAME, CURRENT_LAST_NAME, SOCIAL_SECURITY_NUMBER);
        console.log('Successfully added new employee');
    } catch (err) {
        console.error('[System] employeesManagementController.js | Error adding new employee:', err);
    } finally {
        res.redirect(`/Information/Specific?PERSONAL_ID=${PERSONAL_ID}`);
    }
}

module.exports = { addNewEmployeeInformation };
