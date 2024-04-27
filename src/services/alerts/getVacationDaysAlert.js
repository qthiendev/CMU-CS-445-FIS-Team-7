const { queryHRDB } = require('../../database/queryHRDB');

const getVacationDaysAlert = async (day, month, year) => {
    try {
        var field = [
            'p.[PERSONAL_ID]',
            '(p.[CURRENT_LAST_NAME] + \' \' + p.[CURRENT_MIDDLE_NAME] + \' \' + p.[CURRENT_FIRST_NAME]) as [FULLNAME]',
            '(CONVERT(VARCHAR, ewt.MONTH_WORKING) + \'/\' + CONVERT(VARCHAR, year(ewt.YEAR_WORKING))) as [DURATION]',
            'ewt.[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH] as [VACATION_DAYS]'
        ];

        var table = [
            '[dbo].[EMPLOYMENT_WORKING_TIME] [ewt]',
            '[dbo].[PERSONAL] [p]',
            '[dbo].[EMPLOYMENT] [e]',
        ];

        let cYear = (year !== '') && year !== undefined ? ('year(ewt.YEAR_WORKING) = year(\'' + year + '\')') : 'year(ewt.YEAR_WORKING) = year(getdate())';
        let cMonth = (month !== '') && month !== undefined ? ('CONVERT(VARCHAR, ewt.MONTH_WORKING) = ' + month) : 'ewt.MONTH_WORKING = month(GETDATE())';
        let cDay = (day !== '') && day !== undefined ? (' and CONVERT(VARCHAR, ewt.[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH]) = ' + day) : '';

        var criteria = [
            'e.EMPLOYMENT_ID = ewt.EMPLOYMENT_ID',
            'p.PERSONAL_ID = e.PERSONAL_ID',
            cYear,
            cMonth + cDay
        ];

        sqlQueryHR = ('use [HumanResourceDB] select '
            + field.join(',')
            + ' from '
            + table.join(',')
            + ' where '
            + criteria.join(' and ')
            + ' order by ewt.[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH] desc '
        );

        var data = await queryHRDB(sqlQueryHR);

        console.log('[System] getVacationDaysAlert.js | Got VacationDaysAlert.');

        return data;
    } catch (err) {
        console.log('[System] getVacationDaysAlert.js | Cannot get VacationDaysAlert: ', err);
    }
}

module.exports = { getVacationDaysAlert };