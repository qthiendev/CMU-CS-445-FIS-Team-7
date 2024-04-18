const { querryHRDB } = require('../service/querryHRDB');

const getReportVD = async (req, res) => {
    try {
        let shareholder = req.query.shareholder;
        let gender = req.query.gender;
        let user = req.query.user;
        let department = req.query.department;
        let workType = req.query.workType;

        var data = await querryHRDB();
        // let filteredData = data.filter(record => 
        //     (shareholder == null || record.shareholder === shareholder) &&
        //     (gender == null || record.gender === gender) &&
        //     (user == null || record.user === user) &&
        //     (department == null || record.department === department) &&
        //     (workType == null || record.workType === workType)
        //   );
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
        res.render("rVacationDayPage.ejs", { data } );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getReportVD}