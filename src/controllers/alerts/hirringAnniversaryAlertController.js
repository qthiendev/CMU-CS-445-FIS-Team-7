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
        console.log('[System] hirringAnniversaryAlertController.js | Rendered alertHirringAnniversaryPage.');
    }
    catch (err) {
        console.log('[System] Error at hirringAnniversaryAlertController.js: ', err);
    }
}

module.exports = {renderHirringAnniversaryAlertView};