const { queryHRDB } = require('../../database/queryHRDB');

const getVacationDaysAlert = async (day, month, year) => {
    try {
        var field = [
            '[P].[PERSONAL_ID] AS [ID]',
            '[P].[CURRENT_LAST_NAME] + \' \' + [P].[CURRENT_MIDDLE_NAME] + \' \' + [P].[CURRENT_FIRST_NAME] AS [FULLNAME]',
            'CONVERT(VARCHAR, [EWT].MONTH_WORKING) + \'/\' + CONVERT(VARCHAR, YEAR([EWT].YEAR_WORKING)) AS [DURATION]',
            '[EWT].[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH] as [VACATION_DAYS]'
        ];

        var table = [
            '[DBO].[EMPLOYMENT_WORKING_TIME] [EWT]',
            '[DBO].[PERSONAL] [P]',
            '[DBO].[EMPLOYMENT] [E]',
        ];

        let cYear = (year !== '') && year !== undefined ? ('YEAR(ewt.YEAR_WORKING) = YEAR(\'' + year + '\')') : 'YEAR(ewt.YEAR_WORKING) = YEAR(getdate())';
        let cMonth = (month !== '') && month !== undefined ? ('CONVERT(VARCHAR, [EWT].MONTH_WORKING) = ' + month) : '[EWT].MONTH_WORKING = MONTH(GETDATE())';
        let cDay = (day !== '') && day !== undefined ? (' AND CONVERT(VARCHAR, [EWT].[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH]) = ' + day) : '';

        var criteria = [
            '[E].EMPLOYMENT_ID = [EWT].EMPLOYMENT_ID',
            '[P].PERSONAL_ID = [E].PERSONAL_ID',
            '[E].[EMPLOYMENT_STATUS] != \'Terminated\'',
            cYear,
            cMonth + cDay
        ];

        sqlQueryHR = ('USE [HumanResourceDB] SELECT '
            + field.join(',')
            + ' FROM '
            + table.join(',')
            + ' WHERE '
            + criteria.join(' AND ')
            + ' ORDER BY [EWT].[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH] DESC '
        );

        var data = await queryHRDB(sqlQueryHR);

        console.log('[System] getVacationDaysAlert.js | Got VacationDaysAlert.');

        return data;
    } catch (err) {
        console.log('[System] getVacationDaysAlert.js | Cannot get VacationDaysAlert: ', err);
    }
}

module.exports = { getVacationDaysAlert };