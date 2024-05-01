const { queryHRDB } = require('../../database/queryHRDB');

const getAllEmployeesInformation = async () => {
    try {
        const sqlQueryHR = `
            USE [HUMANRESOURCEDB]
            SELECT [P].[PERSONAL_ID] AS [ID],
                ([P].[CURRENT_LAST_NAME] + ' ' + [P].[CURRENT_MIDDLE_NAME] + ' ' + [P].[CURRENT_FIRST_NAME]) AS [Fullname],
                [P].[CURRENT_GENDER] AS [Gender],
                [P].[BIRTH_DATE] AS [Birthdate],
                ([P].[CURRENT_ADDRESS_1] + ' ' + [P].[CURRENT_CITY] + ' ' + [P].[CURRENT_COUNTRY]) AS [Address],
                [P].[CURRENT_PERSONAL_EMAIL] AS [Email],
                [P].[CURRENT_PHONE_NUMBER] AS [Phone],
                (CASE WHEN [P].[SHAREHOLDER_STATUS] = 1 THEN 'X' ELSE '' END) AS [Shareholder],
                [E].[EMPLOYMENT_STATUS] AS [Status]
            FROM [DBO].[PERSONAL] AS [P]
            LEFT JOIN [DBO].[EMPLOYMENT] AS [E] ON [P].[PERSONAL_ID] = [E].[PERSONAL_ID]
        `;

        const data = await queryHRDB(sqlQueryHR);

        console.log('[System] processEmployee.js | Got AllInformation.');

        return data;
    } catch (err) {
        console.log('[System] processEmployee.js | Cannot get AllInformation: ', err);
    }
}

module.exports = { getAllEmployeesInformation }