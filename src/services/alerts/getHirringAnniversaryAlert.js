const {queryHRDB} = require('../../database/queryHRDB');

const getHirringAnniversaryAlert = async (day) => {
    try {
        let sqlQueryHR = 'SELECT [p].[PERSONAL_ID], ([p].[CURRENT_LAST_NAME] + \' \' + [p].[CURRENT_MIDDLE_NAME] + \' \' + [p].[CURRENT_FIRST_NAME]) as [FULLNAME], [e].[HIRE_DATE_FOR_WORKING], DATEDIFF(day, GETDATE(), DATEFROMPARTS(year(GETDATE()) + CASE WHEN month([e].[HIRE_DATE_FOR_WORKING]) > month(GETDATE()) OR (month([e].[HIRE_DATE_FOR_WORKING]) = month(GETDATE()) AND day([e].[HIRE_DATE_FOR_WORKING]) > day(GETDATE())) THEN 0 ELSE 1 END, month([e].[HIRE_DATE_FOR_WORKING]), day([e].[HIRE_DATE_FOR_WORKING]))) as [UPCOMING] FROM [PERSONAL] [p], [EMPLOYMENT] [e] WHERE DATEFROMPARTS(year(GETDATE()) + CASE WHEN month([e].[HIRE_DATE_FOR_WORKING]) > month(GETDATE()) OR (month([e].[HIRE_DATE_FOR_WORKING]) = month(GETDATE()) AND day([e].[HIRE_DATE_FOR_WORKING]) > day(GETDATE())) THEN 0 ELSE 1 END, month([e].[HIRE_DATE_FOR_WORKING]), day([e].[HIRE_DATE_FOR_WORKING])) BETWEEN GETDATE() AND DATEADD(day, 365, GETDATE()) AND [p].[PERSONAL_ID] = [e].[PERSONAL_ID] ORDER BY [UPCOMING], [FULLNAME]';
        var data = await queryHRDB(sqlQueryHR);
        if (day !== '' && day !== undefined) {
            data = data.filter(record =>
                record.UPCOMING <= day)
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getHirringAnniversaryAlert};