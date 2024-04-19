const {getBirthdayAlert} = require('../../services/alerts/getBirthdayAlert');

const renderBirthdayAlertView = async (req, res) => {
    try {
        let day = req.query.day;

        let data = await getBirthdayAlert(day);
        
        res.render(
            "alertBirthdayPage.ejs", 
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

module.exports = {renderBirthdayAlertView};