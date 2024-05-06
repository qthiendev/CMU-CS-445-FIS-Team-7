const { queryHRDB } = require('../../database/queryHRDB');

const getInformation = async () => {
    try {
        const sqlQueryHR = `
            USE [HUMANRESOURCEDB]
            SELECT [P].[PERSONAL_ID],
                ([P].[CURRENT_LAST_NAME] + ' ' + [P].[CURRENT_MIDDLE_NAME] + ' ' + [P].[CURRENT_FIRST_NAME]) AS [FULLNAME],
                [P].[CURRENT_GENDER],
                [P].[BIRTH_DATE],
                ([P].[CURRENT_ADDRESS_1] + ' ' + [P].[CURRENT_CITY] + ' ' + [P].[CURRENT_COUNTRY]) AS [ADDRESS],
                [P].[CURRENT_PERSONAL_EMAIL],
                [P].[CURRENT_PHONE_NUMBER],
                (CASE WHEN [P].[SHAREHOLDER_STATUS] = 1 THEN 'X' ELSE '' END) AS [SHAREHOLDER_STATUS],
                [E].[EMPLOYMENT_STATUS]
            FROM [DBO].[PERSONAL] AS [P]
            LEFT JOIN [DBO].[EMPLOYMENT] AS [E] ON [P].[PERSONAL_ID] = [E].[PERSONAL_ID]
        `;

        const data = await queryHRDB(sqlQueryHR);

        console.log(data);

        console.log('[System] processEmployee.js | Got AllInformation.');

        return data;
    } catch (err) {
        console.log('[System] processEmployee.js | Cannot get AllInformation: ', err);
    }
}

module.exports = { getInformation }