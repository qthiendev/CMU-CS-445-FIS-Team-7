const { getInformation } = require('../../services/managements/getInformation');

const renderInformationView = async (req, res) => {
    try {
        let data = await getInformation();

        res.render(
            "manageInformationPage.ejs",
            {
                data
            }
        );
        console.log('[System] employeesManagementController.js | Rendered manageInformationPage.');
    }
    catch (err) {
        console.log('[System] Error at employeesManagementController.js | renderInformationView: ', err);
    }
}

module.exports = {
    renderInformationView,
};