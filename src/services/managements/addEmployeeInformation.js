const { queryHRDBSetOnly, queryHRDB } = require('../../database/queryHRDB');
const { queryPRDBSetOnly, queryPRDB } = require('../../database/queryPRDB');

const generateUniqueCode = async () => {
    const CODE_LENGTH = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let code;
    let existingCodes;
    do {
        code = Array.from({ length: CODE_LENGTH }, () => characters.charAt(Math.floor(Math.random() * charactersLength))).join('');
        existingCodes = await queryHRDB(`SELECT [EMPLOYMENT_CODE] FROM [dbo].[EMPLOYMENT] WHERE [EMPLOYMENT_CODE] = '${code}'`);
    } while (existingCodes.length > 0);
    return code;
}

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

const addEmployeeInformation = async (PERSONAL_ID, CURRENT_FIRST_NAME, CURRENT_LAST_NAME, SOCIAL_SECURITY_NUMBER) => {
    try {
        if (!CURRENT_FIRST_NAME && !CURRENT_LAST_NAME && !SOCIAL_SECURITY_NUMBER) {
            console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE');
            return;
        }

        const NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH = 22;
        const PAY_RATE_ID = 1;
        const EMPLOYMENT_CODE = await generateUniqueCode();
        const maxIdEPR = (await queryPRDB(`SELECT MAX(idEmployee) as maxId FROM mydb.\`employee\`;`))[0]['maxId'];
        const Pay_Amount = (await queryPRDB(`SELECT * FROM mydb.\`pay rates\` WHERE \`idPay Rates\` = ${PAY_RATE_ID}`))[0][`Pay Amount`];

        const queryPRDB_Insert = `INSERT INTO mydb.\`employee\`
            (
                \`idEmployee\`,
                \`Employee Number\`,
                \`Last Name\`,
                \`First Name\`,
                \`SSN\`,
                \`Pay Rate\`,
                \`Pay Rates_idPay Rates\`,
                \`Vacation Days\`,
                \`Paid To Date\`,
                \`Paid Last Year\`
            )
            VALUES
            (
                ${maxIdEPR + 1},
                '${EMPLOYMENT_CODE}',
                '${removeDiacritics(CURRENT_LAST_NAME)}',
                '${removeDiacritics(CURRENT_FIRST_NAME)}',
                ${SOCIAL_SECURITY_NUMBER},
                '${(Pay_Amount ? Number(Pay_Amount) : 0 / NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH).toFixed(1)}',
                ${PAY_RATE_ID},
                0,
                5,
                1
            );`

        await queryPRDBSetOnly(queryPRDB_Insert);

        // Ensure that PRDB successful inserted new Employee
        if ((await queryPRDB(`SELECT \`Employee Number\` 
            FROM mydb.\`employee\` 
            WHERE \`Employee Number\` = '${EMPLOYMENT_CODE}'`)).length <= 0) {
            console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE');
            return;
        }
        
        let maxidEHR = (await queryHRDB(`USE [HumanResourceDB] SELECT MAX([EMPLOYMENT_ID]) as maxID FROM [DBO].[EMPLOYMENT]`))[0]['maxID'];
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let HIRE_DATE_FOR_WORKING = `${yyyy}-${mm}-${dd}`;

        let queryHRDB_PersonalInsert = `USE [HumanResourceDB]
            INSERT INTO [DBO].[EMPLOYMENT]
            (
                [EMPLOYMENT_ID],
                [EMPLOYMENT_CODE],
                [EMPLOYMENT_STATUS],
                [HIRE_DATE_FOR_WORKING],
                [WORKERS_COMP_CODE],
                [TERMINATION_DATE],
                [REHIRE_DATE_FOR_WORKING],
                [LAST_REVIEW_DATE],
                [NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH],
                [PERSONAL_ID]
            )
            VALUES
            (
                ${maxidEHR + 1}, 
                '${EMPLOYMENT_CODE}',
                'Full time', 
                ${HIRE_DATE_FOR_WORKING ? `CONVERT(DATETIME, '${HIRE_DATE_FOR_WORKING}', 103)` : `NULL`},
                'JW', 
                NULL,
                NULL,
                ${HIRE_DATE_FOR_WORKING ? `CONVERT(DATETIME, '${HIRE_DATE_FOR_WORKING}', 103)` : `NULL`},
                ${NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH},
                ${PERSONAL_ID}
            );`;

        await queryHRDBSetOnly(queryHRDB_PersonalInsert);

        // Ensure that HRDB successful inserted new Employee
        if ((await queryHRDB(`USE [HumanResourceDB] 
            SELECT [EMPLOYMENT_CODE] 
            FROM [DBO].[EMPLOYMENT] 
            WHERE [EMPLOYMENT_CODE] = '${EMPLOYMENT_CODE}'`)).length <= 0) {
            await queryPRDBSetOnly(`delete from mydb.\`employee\` where \`Employee Number\` = '${EMPLOYMENT_CODE}';`);
            console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE');
            return;
        }

        console.log('[System] employeesManagementController.js | Added new EMPLOYEE');
    } catch (err) {
        console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE:', err);
    }
}

module.exports = { addEmployeeInformation };
