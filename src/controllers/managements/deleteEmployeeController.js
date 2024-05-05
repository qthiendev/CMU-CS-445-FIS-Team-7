const { deleteEmployeeInformation } = require('../../services/managements/deleteEmployeeInformation');

const deleteEmployee = async (req, res) => {

    const {
        PERSONAL_ID,
        EMPLOYMENT_CODE
    } = req.query;

    try {
        await deleteEmployeeInformation(EMPLOYMENT_CODE);
    } catch (err) {
        console.log(err);
    } finally {
        res.redirect(`/Information/Specific/Edit?PERSONAL_ID=${PERSONAL_ID}`);
    }
}

module.exports = { deleteEmployee };