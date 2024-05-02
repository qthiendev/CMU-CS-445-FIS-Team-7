const { queryHRDBSetOnly, queryHRDB } = require('../../database/queryHRDB');
const { queryPRDBSetOnly, queryPRDB } = require('../../database/queryPRDB');

const diacriticsMap = {
    'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
    'đ': 'd',
    'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
    'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
    'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
    'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y'
};

const removeDiacritics = (str) => str.replace(/[áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g, match => diacriticsMap[match]);

const nullCheck = (value, type = 'string') => {
    if (value) {
        return type === 'string' ? `N'${value}'` : `${Number(value)}`;
    }
    return `NULL`;
};

const setSpecificEmployeeInformation = async (
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
    BENEFIT_PLAN_ID,
    EMPLOYMENT_CODE,
    EMPLOYMENT_STATUS,
    HIRE_DATE_FOR_WORKING,
    WORKERS_COMP_CODE,
    TERMINATION_DATE,
    REHIRE_DATE_FOR_WORKING,
    LAST_REVIEW_DATE,
    NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH,
    idPay_Rates
) => {
    try {
        // If you want multiline string , use ``, kinda smart 
        var queryHRDB_PersonalUpdate = `use [HumanResourceDB]
        UPDATE [DBO].[PERSONAL]
        SET [CURRENT_FIRST_NAME] = ${nullCheck(CURRENT_FIRST_NAME)},
        [CURRENT_LAST_NAME] = ${nullCheck(CURRENT_LAST_NAME)},
        [CURRENT_MIDDLE_NAME] = ${nullCheck(CURRENT_MIDDLE_NAME)},
        [BIRTH_DATE] = ${BIRTH_DATE ? `CONVERT(DATETIME, '${BIRTH_DATE}', 103)` : 'NULL'},
        [SOCIAL_SECURITY_NUMBER] = ${nullCheck(SOCIAL_SECURITY_NUMBER)},
        [DRIVERS_LICENSE] = ${nullCheck(DRIVERS_LICENSE)},
        [CURRENT_ADDRESS_1] = ${nullCheck(CURRENT_ADDRESS_1)},
        [CURRENT_ADDRESS_2] = ${nullCheck(CURRENT_ADDRESS_2)},
        [CURRENT_CITY] = ${nullCheck(CURRENT_CITY)},
        [CURRENT_COUNTRY] = ${nullCheck(CURRENT_COUNTRY)},
        [CURRENT_ZIP] = ${nullCheck(CURRENT_ZIP, 'number')},
        [CURRENT_GENDER] = ${nullCheck(CURRENT_GENDER)},
        [CURRENT_PHONE_NUMBER] = ${nullCheck(CURRENT_PHONE_NUMBER)},
        [CURRENT_PERSONAL_EMAIL] = ${nullCheck(CURRENT_PERSONAL_EMAIL)},
        [CURRENT_MARITAL_STATUS] = ${nullCheck(CURRENT_MARITAL_STATUS)},
        [ETHNICITY] = ${nullCheck(ETHNICITY)},
        [SHAREHOLDER_STATUS] = ${nullCheck(SHAREHOLDER_STATUS, 'number')},
        [BENEFIT_PLAN_ID] = ${nullCheck(BENEFIT_PLAN_ID, 'number')}
        WHERE [PERSONAL_ID] = ${PERSONAL_ID};`

        queryHRDBSetOnly(queryHRDB_PersonalUpdate);

        if (EMPLOYMENT_CODE) {
            //Make sure keep the old code for changing Emp code case
            let OLD_EMPLOYMENT_CODE = (await queryHRDB(`use [HumanResourceDB] SELECT * FROM [DBO].[EMPLOYMENT] WHERE [PERSONAL_ID] = ${Number(PERSONAL_ID)}`))[0]['EMPLOYMENT_CODE'];
            let Pay_Amount = (await queryPRDB(`SELECT * FROM mydb.\`pay rates\` WHERE \`idPay Rates\` = ${Number(idPay_Rates)}`))[0][`Pay Amount`];
            let payRate = (Pay_Amount ? Number(Pay_Amount) : 0 / NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH).toFixed(1);

            var queryHRDB_EmployeeUpdate = `use [HumanResourceDB]
                UPDATE [DBO].[EMPLOYMENT]
                SET [EMPLOYMENT_CODE] = ${nullCheck(EMPLOYMENT_CODE)},
                [EMPLOYMENT_STATUS] = ${nullCheck(EMPLOYMENT_STATUS)},
                [HIRE_DATE_FOR_WORKING] = ${HIRE_DATE_FOR_WORKING ? `CONVERT(DATETIME, '${HIRE_DATE_FOR_WORKING}', 103)` : 'NULL'},
                [WORKERS_COMP_CODE] = ${nullCheck(WORKERS_COMP_CODE)},
                [TERMINATION_DATE] = ${TERMINATION_DATE ? `CONVERT(DATETIME, '${TERMINATION_DATE}', 103)` : 'NULL'},
                [REHIRE_DATE_FOR_WORKING] = ${REHIRE_DATE_FOR_WORKING ? `CONVERT(DATETIME, '${REHIRE_DATE_FOR_WORKING}', 103)` : 'NULL'},
                [LAST_REVIEW_DATE] = ${LAST_REVIEW_DATE ? `CONVERT(DATETIME, '${LAST_REVIEW_DATE}', 103)` : 'NULL'},
                [NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH] = ${nullCheck(NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH, 'number')}
                WHERE [PERSONAL_ID] = ${PERSONAL_ID};`

            var queryPRDB_Update = `UPDATE mydb.\`employee\`
                SET \`Employee Number\` = ${nullCheck(EMPLOYMENT_CODE)},
                \`Last Name\` = ${nullCheck(removeDiacritics(CURRENT_LAST_NAME))},
                \`First Name\` = ${nullCheck(removeDiacritics(CURRENT_FIRST_NAME))},
                \`SSN\` = ${nullCheck(SOCIAL_SECURITY_NUMBER)},
                \`Pay Rate\` = '${payRate}',
                \`Paid To Date\` = 5,
                \`Paid Last Year\` = 1,
                \`Pay Rates_idPay Rates\` = ${nullCheck(idPay_Rates, 'number')}
                WHERE \`Employee Number\` = '${OLD_EMPLOYMENT_CODE}';`

            queryHRDBSetOnly(queryHRDB_EmployeeUpdate);
            queryPRDBSetOnly(queryPRDB_Update);
        }
    } catch (err) {
        console.log('[System] processEmployee.js | Cannot set Information [' + PERSONAL_ID + ']: ', err);
    }
}

const addPersonalInformation = async (PERSONAL_ID,
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
    try {
        let PERSONAL_ID = (await queryHRDB(`use [HumanResourceDB] SELECT MAX([PERSONAL_ID]) as maxId FROM [DBO].[PERSONAL]`))[0]['maxId'] + 1;

        var queryHRDB_PersonalInsert = `use [HumanResourceDB]
        INSERT INTO [DBO].[PERSONAL]
        (
            [PERSONAL_ID], 
            [CURRENT_FIRST_NAME], 
            [CURRENT_LAST_NAME], 
            [CURRENT_MIDDLE_NAME], 
            [BIRTH_DATE], 
            [SOCIAL_SECURITY_NUMBER], 
            [DRIVERS_LICENSE], 
            [CURRENT_ADDRESS_1], 
            [CURRENT_ADDRESS_2], 
            [CURRENT_CITY], 
            [CURRENT_COUNTRY], 
            [CURRENT_ZIP], 
            [CURRENT_GENDER], 
            [CURRENT_PHONE_NUMBER], 
            [CURRENT_PERSONAL_EMAIL], 
            [CURRENT_MARITAL_STATUS], 
            [ETHNICITY], 
            [SHAREHOLDER_STATUS], 
            [BENEFIT_PLAN_ID]
        )
        VALUES
        (
            ${PERSONAL_ID}, 
            ${nullCheck(CURRENT_FIRST_NAME)}, 
            ${nullCheck(CURRENT_LAST_NAME)}, 
            ${nullCheck(CURRENT_MIDDLE_NAME)}, 
            ${BIRTH_DATE ? `CONVERT(DATETIME, '${BIRTH_DATE}', 103)` : 'NULL'}, 
            ${nullCheck(SOCIAL_SECURITY_NUMBER)}, 
            ${nullCheck(DRIVERS_LICENSE)}, 
            ${nullCheck(CURRENT_ADDRESS_1)}, 
            ${nullCheck(CURRENT_ADDRESS_2)}, 
            ${nullCheck(CURRENT_CITY)}, 
            ${nullCheck(CURRENT_COUNTRY)}, 
            ${nullCheck(CURRENT_ZIP, 'number')}, 
            ${nullCheck(CURRENT_GENDER)}, 
            ${nullCheck(CURRENT_PHONE_NUMBER)}, 
            ${nullCheck(CURRENT_PERSONAL_EMAIL)}, 
            ${nullCheck(CURRENT_MARITAL_STATUS)}, 
            ${nullCheck(ETHNICITY)},
            ${nullCheck(SHAREHOLDER_STATUS, 'number')}, 
            ${nullCheck(BENEFIT_PLAN_ID, 'number')}
        );`

        queryHRDBSetOnly(queryHRDB_PersonalInsert);
    } catch {

    }
}

module.exports = {
    setSpecificEmployeeInformation,
    addPersonalInformation
}
