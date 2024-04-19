const {queryHRDB} = require('../../database/queryHRDB');

const getBirthdayAlert = async (day) => {
    try {
        let sqlQueryHR = 'select [PERSONAL_ID], ([CURRENT_LAST_NAME] + \' \' + [CURRENT_MIDDLE_NAME] + \' \' + [CURRENT_FIRST_NAME]) as [FULLNAME], [BIRTH_DATE], DATEDIFF(day, GETDATE(), DATEADD(year, DATEDIFF(year, [BIRTH_DATE], GETDATE()), [BIRTH_DATE])) as [UPCOMING] FROM [PERSONAL] where DATEADD(year, DATEDIFF(year, [BIRTH_DATE], GETDATE()), [BIRTH_DATE]) BETWEEN GETDATE() AND DATEADD(day, 366, GETDATE()) order by [UPCOMING]';
        var data = await queryHRDB(sqlQueryHR);
        if (day !== '' && day !== undefined) {
            data = data.filter(record =>
                record.UPCOMING <= day)
        }
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getBirthdayAlert};