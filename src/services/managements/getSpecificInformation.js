const { queryHRDB } = require('../../database/queryHRDB');
const { queryPRDB } = require('../../database/queryPRDB');

const sqlQueries = {
    hr: `
        USE [HumanResourceDB]
        SELECT [P].[PERSONAL_ID], 
        [P].[CURRENT_FIRST_NAME], 
        [P].[CURRENT_LAST_NAME], 
        [P].[CURRENT_MIDDLE_NAME],
        [P].[BIRTH_DATE], 
        [P].[SOCIAL_SECURITY_NUMBER], 
        [P].[DRIVERS_LICENSE], 
        [P].[CURRENT_ADDRESS_1],
        [P].[CURRENT_ADDRESS_2], 
        [P].[CURRENT_CITY], 
        [P].[CURRENT_COUNTRY], 
        [P].[CURRENT_ZIP],
        [P].[CURRENT_GENDER], 
        [P].[CURRENT_PHONE_NUMBER], 
        [P].[CURRENT_PERSONAL_EMAIL],
        [P].[CURRENT_MARITAL_STATUS], 
        [P].[ETHNICITY], 
        [P].[SHAREHOLDER_STATUS], 
        [BP].[BENEFIT_PLANS_ID],
        [BP].[PLAN_NAME], 
        [BP].[DEDUCTABLE], 
        [BP].[PERCENTAGE_COPAY], 
        [E].[EMPLOYMENT_CODE],
        [E].[EMPLOYMENT_STATUS], 
        [E].[HIRE_DATE_FOR_WORKING], 
        [E].[WORKERS_COMP_CODE], 
        [E].[TERMINATION_DATE],
        [E].[REHIRE_DATE_FOR_WORKING], 
        [E].[LAST_REVIEW_DATE], 
        [E].[NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH]
        FROM [HumanResourceDB].[dbo].[PERSONAL] P
        LEFT JOIN [HumanResourceDB].[dbo].[EMPLOYMENT] E ON P.PERSONAL_ID = E.PERSONAL_ID
        LEFT JOIN [HumanResourceDB].[dbo].[BENEFIT_PLANS] BP ON P.BENEFIT_PLAN_ID = BP.BENEFIT_PLANS_ID
    `,
    pr: `
        SELECT \`Employee Number\`, 
        \`idPay Rates\`, 
        \`Pay Rate Name\`, 
        \`Value\`, 
        \`Pay Rate\`,
        \`Paid To Date\`, 
        \`Pay Rate\`, 
        \`Pay Type\`, 
        \`Tax Percentage\`, 
        \`Pay Amount\`, 
        \`PT - Level C\`
        FROM mydb.\`employee\` 
        JOIN mydb.\`pay rates\` ON mydb.\`employee\`.\`Pay Rates_idPay Rates\` = mydb.\`pay rates\`.\`idPay Rates\`
    `
};

const getInformation = async () => {
    try {
        const dataHR = await queryHRDB(sqlQueries.hr);
        const dataPR = await queryPRDB(sqlQueries.pr);

        return dataHR.map(hrRow => {
            const prRow = dataPR.find(prRow => String(prRow['Employee Number']) === String(hrRow['EMPLOYMENT_CODE']));
            const defaultPrRow = {
                'idPay Rates': null,
                'Pay Rate Name': null,
                'Value': null,
                'Pay Rate': null,
                'Paid To Date': null,
                'Pay Type': null,
                'Tax Percentage': null,
                'Pay Amount': null,
                'PT - Level C': null
            };
            return { ...hrRow, ...defaultPrRow, ...(prRow || {}) };
        });
    } catch (err) {
        console.log('[System] processEmployee.js | Cannot get Information: ', err);
    }
}

const getInformationByField = async (field, value) => {
    try {
        const data = await getInformation();
        return data.find(record => record[field] == value) || data[data.length - 1];
    } catch (err) {
        console.log(`[System] processEmployee.js | Cannot get Information by ${field}: `, err);
    }
}

module.exports = {
    getInformation,
    getInformationByPersonalID: (PERSONAL_ID) => getInformationByField('PERSONAL_ID', PERSONAL_ID),
    getInformationByEmploymentCode: (EMPLOYMENT_CODE) => getInformationByField('EMPLOYMENT_CODE', EMPLOYMENT_CODE)
}
