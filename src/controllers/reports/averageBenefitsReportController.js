const { getAverageBenefitsReport } = require('../../services/reports/getAverageBenefitsReport');

const renderAverageBenefitsReportView = async (req, res) => {
    try {
        let id = req.query.id;
        let fullname = req.query.fullname;
        let planName = req.query.planName;
        let totalMonth = req.query.totalMonth;
        let totalBenefit = req.query.totalBenefit;
        let shareholder = req.query.shareholder;

        let data = await getAverageBenefitsReport(id, fullname, planName, shareholder, totalMonth, totalBenefit);

        res.render(
            "reportAverageBenefitsPage.ejs",
            {
                data,
                id, 
                fullname, 
                planName, 
                totalMonth, 
                totalBenefit,
                shareholder
            }
        );
        console.log('[System] averageBenefitsReportController.js | Rendered reportAverageBenefitsPage.');
    }
    catch (err) {
        console.log('[System] Error at averageBenefitsReportController.js: ', err);
    }
}

module.exports = { renderAverageBenefitsReportView };