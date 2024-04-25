const {getVacationDaysAlert} = require('../../services/alerts/getVacationDaysAlert');

const renderVacationDaysAlertView = async (req, res) => {
    try {
        let day = req.query.day;
        let month = req.query.month;
        let year = req.query.year;
        
        let data = await getVacationDaysAlert(day, month, year);
        
        res.render(
            "alertVacationDaysPage.ejs", 
            {
                data,
                day,
                month,
                year
            }
        );
        console.log('[System] vacationDaysAlertController.js | Rendered alertVacationDaysPage.');
    }
    catch (err) {
        console.log('[System] Error at vacationDaysAlertController.js: ', err);
    }
}

module.exports = {renderVacationDaysAlertView};