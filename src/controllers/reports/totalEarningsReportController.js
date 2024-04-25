const {getTotalEarningsReport} = require('../../services/reports/getTotalEarningsReport');

const renderTotalEarningsReportView = async (req, res) => {
    try {
        let id = req.query.id;
        let fullname = req.query.fullname;
        let gender = req.query.gender;
        let ethnicity = req.query.ethnicity;
        let totalDayWork = req.query.totalDayWork;
        let totalPaid = req.query.totalPaid;

        let data = await getTotalEarningsReport(id, fullname, gender, ethnicity, totalDayWork, totalPaid);
        
        res.render(
            "reportTotalEarningsPage.ejs", 
            {
                data,
                id,
                fullname,
                gender,
                ethnicity,
                totalDayWork,
                totalPaid,
            }
        );
        console.log('[System] totalEarningsReportController.js | Rendered reportTotalEarningsPage.');
    }
    catch (err) {
        console.log('[System] Error at totalEarningsReportController.js: ', err);
    }
}

module.exports = {renderTotalEarningsReportView};