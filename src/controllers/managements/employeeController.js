const { getAllInformation } = require('../../services/managements/processEmployee');

const renderManageAllEmployeesView = async (req, res) => {
    try {
        let data = await getAllInformation();

        res.render(
            "manageAllEmployeesPage.ejs",
            {
                data
            }
        );
        console.log('[System] averageBenefitsReportController.js | Rendered reportAverageBenefitsPage.');
    }
    catch (err) {
        console.log('[System] Error at averageBenefitsReportController.js: ', err);
    }
}

module.exports = { renderManageAllEmployeesView };