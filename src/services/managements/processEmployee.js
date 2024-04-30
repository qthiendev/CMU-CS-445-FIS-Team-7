const { queryHRDB, queryHRDBSetOnly } = require('../../database/queryHRDB');
const { queryPRDB } = require('../../database/queryPRDB');
const { merge } = require('../../routers/web');

const getAllInformation = async () => {
    try {
        var field = [
            'p.[PERSONAL_ID] as [ID]',
            '(p.[CURRENT_LAST_NAME] + \' \' + p.[CURRENT_MIDDLE_NAME] + \' \' + p.[CURRENT_FIRST_NAME]) as [Fullname]',
            'p.[CURRENT_GENDER] as [Gender]',
            'p.[BIRTH_DATE] as [Birthdate]',
            '(p.[CURRENT_ADDRESS_1] + \' \' + p.[CURRENT_CITY] + \' \' + p.[CURRENT_COUNTRY]) as [Address]',
            'p.[CURRENT_PERSONAL_EMAIL] as [Email]',
            'p.[CURRENT_PHONE_NUMBER] as [Phone]',
            '(CASE WHEN p.[SHAREHOLDER_STATUS] = 1 THEN \'X\' ELSE \'\' END) as [Shareholder]',
            '(CASE WHEN e.[EMPLOYMENT_STATUS] is not NULL THEN \'X\' ELSE \'\' END) as [Status]'

        ];

        var table = [
            '[dbo].[PERSONAL] p'
        ];

        sqlQueryHR = ('use [HumanResourceDB] select '
            + field.join(',')
            + ' from '
            + table.join(',')
            + ' LEFT JOIN [EMPLOYMENT] e ON p.PERSONAL_ID = e.PERSONAL_ID;'
        );

        var data = await queryHRDB(sqlQueryHR);

        console.log('[System] processEmployee.js | Got AllInformation.');

        return data;
    } catch (err) {
        console.log('[System] processEmployee.js | Cannot get AllInformation: ', err);
    }
}

const getInformation = async (id) => {
    try {
        var fieldHR = ['[P].[PERSONAL_ID]',
            '[P].[CURRENT_FIRST_NAME]',
            '[P].[CURRENT_LAST_NAME]',
            '[P].[CURRENT_MIDDLE_NAME]',
            '[P].[BIRTH_DATE]',
            '[P].[SOCIAL_SECURITY_NUMBER]',
            '[P].[DRIVERS_LICENSE]',
            '[P].[CURRENT_ADDRESS_1]',
            '[P].[CURRENT_ADDRESS_2]',
            '[P].[CURRENT_CITY]',
            '[P].[CURRENT_COUNTRY]',
            '[P].[CURRENT_ZIP]',
            '[P].[CURRENT_GENDER]',
            '[P].[CURRENT_PHONE_NUMBER]',
            '[P].[CURRENT_PERSONAL_EMAIL]',
            '[P].[CURRENT_MARITAL_STATUS]',
            '[P].[ETHNICITY]',
            '[P].[SHAREHOLDER_STATUS]',
            '[BP].[BENEFIT_PLANS_ID]',
            '[BP].[PLAN_NAME]',
            '[BP].[DEDUCTABLE]',
            '[BP].[PERCENTAGE_COPAY]',
            '[E].[EMPLOYMENT_CODE]',
            '[E].[EMPLOYMENT_STATUS]',
            '[E].[HIRE_DATE_FOR_WORKING]',
            '[E].[WORKERS_COMP_CODE]',
            '[E].[TERMINATION_DATE]',
            '[E].[REHIRE_DATE_FOR_WORKING]',
            '[E].[LAST_REVIEW_DATE]',
            '[E].[NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH]'
        ];

        sqlQueryHR = ('use [HumanResourceDB] select '
            + fieldHR.join(',')
            + 'FROM [HumanResourceDB].[dbo].[PERSONAL] P\n'
            + 'LEFT JOIN [HumanResourceDB].[dbo].[EMPLOYMENT] E ON P.PERSONAL_ID = E.PERSONAL_ID\n'
            + 'LEFT JOIN [HumanResourceDB].[dbo].[BENEFIT_PLANS] BP ON P.BENEFIT_PLAN_ID = BP.BENEFIT_PLANS_ID'
        );

        var dataHR = await queryHRDB(sqlQueryHR);

        var fieldPR = ['`Employee Number`',
            '`idPay Rates`',
            '`Pay Rate Name`',
            '`Value`',
            '`Pay Rate`',
            '`Paid To Date`',
            '`Pay Rate`',
            '`Pay Type`',
            '`Tax Percentage`',
            '`Pay Amount`',
            '`PT - Level C`',
        ];

        sqlQueryPR = ('select '
            + fieldPR.join(',')
            + 'FROM mydb.`employee` JOIN mydb.`pay rates` ON mydb.`employee`.`Pay Rates_idPay Rates` = mydb.`pay rates`.`idPay Rates`'
        );

        var dataPR = await queryPRDB(sqlQueryPR);

        var mergeData = dataHR.map(hrRow => {
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
            if (prRow) {
                const { ['Employee Number']: _, ...restOfPrRow } = prRow;
                return { ...hrRow, ...defaultPrRow, ...restOfPrRow };
            }
            return { ...hrRow, ...defaultPrRow };
        });

        console.log(mergeData)
        if (Number(id) >= mergeData.length)
            return mergeData[mergeData.length - 1];

        if (id !== '' && id !== undefined) {
            mergeData = mergeData.filter(record =>
                record.PERSONAL_ID == id)
        }

        return mergeData[0];
    }
    catch (err) {
        console.log('[System] processEmployee.js | Cannot get Information [' + id + ']: ', err);
    }
}

const setInformation = async (
    PERSONAL_ID,
    CURRENT_FIRST_NAME,
    CURRENT_LAST_NAME,
    CURRENT_MIDDLE_NAME,
    BIRTH_DATE,
    SOCIAL_SECURITY_NUMBER,
    DRIVERS_LICENSE,
    CURRENT_ADDRESS_1,
    CURRENT_ADDRESS_2,
    CURRENT_CITY,
    CURRENT_COUNTRY,
    CURRENT_ZIP,
    CURRENT_GENDER,
    CURRENT_PHONE_NUMBER,
    CURRENT_PERSONAL_EMAIL,
    CURRENT_MARITAL_STATUS,
    ETHNICITY,
    SHAREHOLDER_STATUS,
    BENEFIT_PLAN_ID
) => {
    try{
    var queryHRDB = `use [HumanResourceDB]
        UPDATE [DBO].[PERSONAL]
        SET [CURRENT_FIRST_NAME] = N'${CURRENT_FIRST_NAME}',
        [CURRENT_LAST_NAME] = N'${CURRENT_LAST_NAME}',
        [CURRENT_MIDDLE_NAME] = N'${CURRENT_MIDDLE_NAME}',
        [BIRTH_DATE] = CONVERT(DATETIME, '${BIRTH_DATE}', 103),
        [SOCIAL_SECURITY_NUMBER] = N'${SOCIAL_SECURITY_NUMBER}',
        [DRIVERS_LICENSE] = N'${DRIVERS_LICENSE}',
        [CURRENT_ADDRESS_1] = N'${CURRENT_ADDRESS_1}',
        [CURRENT_ADDRESS_2] = N'${CURRENT_ADDRESS_2}',
        [CURRENT_CITY] = N'${CURRENT_CITY}',
        [CURRENT_COUNTRY] = N'${CURRENT_COUNTRY}',
        [CURRENT_ZIP] = ${Number(CURRENT_ZIP)},
        [CURRENT_GENDER] = N'${CURRENT_GENDER}',
        [CURRENT_PHONE_NUMBER] = N'${CURRENT_PHONE_NUMBER}',
        [CURRENT_PERSONAL_EMAIL] = N'${CURRENT_PERSONAL_EMAIL}',
        [CURRENT_MARITAL_STATUS] = N'${CURRENT_MARITAL_STATUS}',
        [ETHNICITY] = N'${ETHNICITY}',
        [SHAREHOLDER_STATUS] = ${Number(SHAREHOLDER_STATUS)},
        [BENEFIT_PLAN_ID] = ${Number(BENEFIT_PLAN_ID)}
        WHERE [PERSONAL_ID] = ${PERSONAL_ID};`
    // Execute the query here
    console.log(queryHRDB)
    console.log(queryHRDBSetOnly(queryHRDB));
}  catch (err) {
    console.log('[System] processEmployee.js | Cannot set Information [' + id + ']: ', err);
}
}

module.exports = {
    getAllInformation,
    getInformation,
    setInformation,
}