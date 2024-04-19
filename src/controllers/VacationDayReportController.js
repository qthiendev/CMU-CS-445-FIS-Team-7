const { getVDR } = require('../service/getVDR');

const getReportVD = async (req, res) => {
    try {
        let id = req.query.id;
        let fullname = req.query.fullname;
        let gender = req.query.gender;
        let ethnicity = req.query.ethnicity;
        let shareholder = req.query.shareholder;
        let workType  = req.query.workType;
        let vacationDays =  req.query.vacationDays;

        let data = await getVDR(id, fullname, gender, ethnicity, shareholder, workType, vacationDays, '2024');
        
        res.render(
            "VacationDayReportPage.ejs", 
            {
                data,
                id,
                fullname,
                gender,
                ethnicity,
                shareholder,
                workType,
                vacationDays
            }
        );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getReportVD};