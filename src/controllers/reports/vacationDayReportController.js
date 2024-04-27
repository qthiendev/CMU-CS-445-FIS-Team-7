const { getVacationDaysReport } = require('../../services/reports/getVacationDaysReport');

const renderVacationDaysReportView = async (req, res) => {
    try {
        let id = req.query.id;
        let fullname = req.query.fullname;
        let gender = req.query.gender;
        let ethnicity = req.query.ethnicity;
        let shareholder = req.query.shareholder;
        let workType = req.query.workType;
        let vacationDays = req.query.vacationDays;
        let year = req.query.year;

        let data = await getVacationDaysReport(id, fullname, gender, ethnicity, shareholder, workType, vacationDays, year);

        res.render(
            "reportVacationDaysPage.ejs",
            {
                data,
                id,
                fullname,
                gender,
                ethnicity,
                shareholder,
                workType,
                vacationDays,
                year
            }
        );
        console.log('[System] vacationDayReportController.js | Rendered reportVacationDaysPage.');
    }
    catch (err) {
        console.log('[System] Error at vacationDayReportController.js: ', err);
    }
}

module.exports = { renderVacationDaysReportView };