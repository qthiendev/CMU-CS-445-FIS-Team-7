const { querryHRDB } = require('../service/querryHRDB');

const getReportVD = async (req, res) => {
    try {
        let shareholder = req.body.shareholder;
        let Gender = req.body.Gender;
        let user = req.body.user;
        let department = req.body.department;
        let workType = req.body.workType;

        var data = await querryHRDB();
        // let filteredData = data.filter(record => 
        //     (shareholder == null || record.shareholder === shareholder) &&
        //     (gender == null || record.gender === gender) &&
        //     (user == null || record.user === user) &&
        //     (department == null || record.department === department) &&
        //     (workType == null || record.workType === workType)
        //   );
        if (Gender) {
            data = data.filter(record => (record.CURRENT_GENDER === Gender));
        }
        console.log('crite:', req.body);
        console.log('data:', data);
        res.render("rVacationDayPage.ejs", { data } );
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getReportVD}