const { queryHRDB } = require('../../database/queryHRDB');

const getHirringAnniversaryAlert = async (day) => {
    try {
        sqlQueryHR = ('USE [HumanResourceDB]\n' +
            'SELECT [P].[PERSONAL_ID] AS [ID],\n' +
            '([P].[CURRENT_LAST_NAME] + \' \' + [P].[CURRENT_MIDDLE_NAME] + \' \' + [P].[CURRENT_FIRST_NAME]) AS [FULLNAME],\n' +
            '[E].[HIRE_DATE_FOR_WORKING] AS [HIRE_DATE],\n' +
            'DATEDIFF(DAY, GETDATE(), DATEFROMPARTS(YEAR(GETDATE())\n' +
            '+ CASE WHEN MONTH([E].[HIRE_DATE_FOR_WORKING]) > MONTH(GETDATE())\n' +
            'OR (MONTH([E].[HIRE_DATE_FOR_WORKING]) = MONTH(GETDATE())\n' +
            'AND DAY([E].[HIRE_DATE_FOR_WORKING]) > DAY(GETDATE()))\n' +
            'THEN 0 ELSE 1 END,\n' +
            'MONTH([E].[HIRE_DATE_FOR_WORKING]),\n' +
            'DAY([E].[HIRE_DATE_FOR_WORKING]))) AS [UPCOMING]\n' +
            'FROM [DBO].[PERSONAL] [P], [DBO].[EMPLOYMENT] [E]\n' +
            'WHERE DATEFROMPARTS(YEAR(GETDATE())\n' +
            '+ CASE WHEN MONTH([E].[HIRE_DATE_FOR_WORKING]) > MONTH(GETDATE())\n' +
            'OR (MONTH([E].[HIRE_DATE_FOR_WORKING]) = MONTH(GETDATE())\n' +
            'AND DAY([E].[HIRE_DATE_FOR_WORKING]) > DAY(GETDATE()))\n' +
            'THEN 0 ELSE 1 END,\n' +
            'MONTH([E].[HIRE_DATE_FOR_WORKING]),\n' +
            'DAY([E].[HIRE_DATE_FOR_WORKING]))\n' +
            'BETWEEN GETDATE()\n' +
            'AND DATEADD(DAY, 365, GETDATE())\n' +
            'AND [P].[PERSONAL_ID] = [E].[PERSONAL_ID]\n' +
            'GROUP BY [P].[PERSONAL_ID], [P].[CURRENT_LAST_NAME], [P].[CURRENT_MIDDLE_NAME], [P].[CURRENT_FIRST_NAME], [E].[HIRE_DATE_FOR_WORKING]\n' +
            'ORDER BY [UPCOMING];'
        );

        var data = await queryHRDB(sqlQueryHR);

        if (day !== '' && day !== undefined) {
            data = data.filter(record =>
                record.UPCOMING <= day)
        }

        console.log('[System] getHirringAnniversaryAlert.js | Got HirringAnniversaryAlert.');

        return data;
    } catch (err) {
        console.log('[System] getHirringAnniversaryAlert.js | Cannot get HirringAnniversaryAlert: ', err);
    }
}

module.exports = { getHirringAnniversaryAlert };