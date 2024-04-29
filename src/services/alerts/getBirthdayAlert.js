const { queryHRDB } = require('../../database/queryHRDB');

const getBirthdayAlert = async (day) => {
    try {
        var queryPart = [
            'SELECT [PERSONAL_ID] AS [ID],',
            '[CURRENT_LAST_NAME] + \' \' + [CURRENT_MIDDLE_NAME] + \' \' + [CURRENT_FIRST_NAME] AS [FULLNAME],',
            '[BIRTH_DATE] AS [BIRTHDATE],',
            'DATEDIFF(DAY, GETDATE(), DATEFROMPARTS(YEAR(GETDATE())',
            '+ CASE WHEN MONTH([BIRTH_DATE]) > MONTH(GETDATE())',
            'OR (MONTH([BIRTH_DATE]) = MONTH(GETDATE())',
            'AND DAY([BIRTH_DATE]) > DAY(GETDATE()))',
            'THEN 0 ELSE 1 END,',
            'MONTH([BIRTH_DATE]), DAY([BIRTH_DATE]))) AS [UPCOMING]',
            'FROM [PERSONAL]',
            'WHERE DATEFROMPARTS(YEAR(GETDATE())',
            '+ CASE WHEN MONTH([BIRTH_DATE]) > MONTH(GETDATE()) ',
            'OR (MONTH([BIRTH_DATE]) = MONTH(GETDATE())',
            'AND DAY([BIRTH_DATE]) > DAY(GETDATE()))',
            'THEN 0 ELSE 1 END,',
            'MONTH([BIRTH_DATE]), DAY([BIRTH_DATE])) BETWEEN GETDATE() AND DATEADD(DAY, 365, GETDATE())',
            'ORDER BY [UPCOMING];'
        ];

        sqlQueryHR = ('USE [HumanResourceDB] ' + queryPart.join('\n'));

        var data = await queryHRDB(sqlQueryHR);

        if (day !== '' && day !== undefined) {
            data = data.filter(record =>
                record.UPCOMMING <= day)
        }

        console.log('[System] getBirthdayAlert.js | Got BirthdayAlert.');

        return data;
    } catch (err) {
        console.log('[System] getBirthdayAlert.js | Cannot get BirthdayAlert: ', err);
    }
}

module.exports = { getBirthdayAlert };