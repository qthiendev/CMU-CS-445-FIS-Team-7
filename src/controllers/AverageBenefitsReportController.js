const { getABR } = require('../service/getABR');

const getReportAB = async (req, res) => {
    try {
        let id = req.query.id;
        let fullname = req.query.fullname;
        let gender = req.query.gender;
        let ethnicity = req.query.ethnicity;
        let plan = req.query.plan;
        let paid = req.query.paid;

        let data = await getABR(id, fullname, gender, ethnicity, plan, paid);
        
        res.render(
            "AverageBenefitsReportPage.ejs", 
            {
                data,
                id, 
                fullname, 
                gender,
                ethnicity, 
                plan, 
                paid
            }
        );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getReportAB};