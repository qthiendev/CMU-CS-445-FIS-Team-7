const {getVacationDaysAlert} = require('../../services/alerts/getVacationDaysAlert');

const renderVacationDaysAlertView = async (req, res) => {
    try {
        let day = req.query.day;
        let month = req.query.month;
        let year = req.query.year;

        console.log(req.query);
        
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
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {renderVacationDaysAlertView};