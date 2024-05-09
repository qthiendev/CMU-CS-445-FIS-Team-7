const { getBenefitPlansAlert } = require('../../services/alerts/getBenefitPlansAlert');

const renderBenefitPlansAlertPage = async (req, res) => {

    try {
        var data = await getBenefitPlansAlert();
        res.render("alertBenefitPlansPage.ejs", { data });

    } catch (err) {
        console.log(err);
    }
}

module.exports = { renderBenefitPlansAlertPage };