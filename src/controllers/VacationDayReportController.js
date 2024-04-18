const { queryHRDB } = require('../service/queryHRDB');

const getReportVD = async (req, res) => {
    try {
        let shareholder = req.query.shareholder;
        let gender = req.query.gender;
        let user = req.query.user;
        let department = req.query.department;
        let workType = req.query.workType;
        
        const sqlQueryHR = 'select p.PERSONAL_ID, p.CURRENT_LAST_NAME, p.CURRENT_MIDDLE_NAME,p.CURRENT_FIRST_NAME,p.CURRENT_GENDER,p.ETHNICITY,p.SHAREHOLDER_STATUS,e.EMPLOYMENT_STATUS, sum(ewt.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH) as TOTAL_VACATION_DAYS from EMPLOYMENT_WORKING_TIME ewt, PERSONAL p, EMPLOYMENT e where e.PERSONAL_ID = p.PERSONAL_ID and e.EMPLOYMENT_ID = ewt.EMPLOYMENT_ID group by p.PERSONAL_ID, p.CURRENT_LAST_NAME, p.CURRENT_MIDDLE_NAME, p.CURRENT_FIRST_NAME, p.CURRENT_GENDER, p.ETHNICITY, p.SHAREHOLDER_STATUS, e.EMPLOYMENT_STATUS;';
        var data = await queryHRDB(sqlQueryHR);

        console.log(shareholder);
        if (shareholder !== '' && shareholder !== undefined){
            data = data.filter(record => record.SHAREHOLDER_STATUS == shareholder)
        }
        if (gender !== '' && gender !== undefined){
            data = data.filter(record => record.SHAREHOLDER_STATUS == shareholder)
        }
        if (user !== '' && user !== undefined){
            data = data.filter(record => record.SHAREHOLDER_STATUS == shareholder)
        }
        if (shareholder !== '' && shareholder !== undefined){
            data = data.filter(record => record.SHAREHOLDER_STATUS == shareholder)
        }
        if (shareholder !== '' && shareholder !== undefined){
            data = data.filter(record => record.SHAREHOLDER_STATUS == shareholder)
        }

        res.render("VacationDayReportPage.ejs", { data } );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getReportVD}