const {getHirringAnniversaryAlert} = require('../../services/alerts/getHirringAnniversaryAlert');

const renderHirringAnniversaryAlertView = async (req, res) => {
    try {
        let day = req.query.day;

        let data = await getHirringAnniversaryAlert(day);
        
        res.render(
            "alertHirringAnniversaryPage.ejs", 
            {
                data,
                day
            }
        );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {renderHirringAnniversaryAlertView};