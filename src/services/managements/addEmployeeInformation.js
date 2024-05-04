const { queryHRDBSetOnly, queryHRDB } = require('../../database/queryHRDB');
const { queryPRDBSetOnly, queryPRDB } = require('../../database/queryPRDB');
const { editSpecificInformation } = require('../managements/editSpecificInformation')

async function generateUniqueCode() {
    let code;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let existingCodes; // Declare existingCodes here
    do {
        code = '';
        for (let i = 0; i < 16; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        // Query the database to check if the code already exists
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

const removeDiacritics = (str) => //This method turn Vietnamese text to English-base text
    str.replace(/[áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g,
        match => diacriticsMap[match]
    );

const nullCheck = (value, type = 'string') => {
    if (value) {
        return type === 'string' ? `N'${value}'` : `${Number(value)}`;
    }
    return `NULL`;
};

const addEmployeeInformation = async (PERSONAL_ID,
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
    BENEFIT_PLANS_ID) => {
    try {
        if (!CURRENT_FIRST_NAME && !CURRENT_LAST_NAME && !SOCIAL_SECURITY_NUMBER) {
            console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE');
            return;
        }

        var EMPLOYMENT_CODE = await generateUniqueCode();

        let maxIdE = (await queryPRDB(`SELECT MAX(idEmployee) as maxId FROM mydb.\`employee\`;`))[0]['maxId'];
        let Pay_Amount = (await queryPRDB(`SELECT * FROM mydb.\`pay rates\` WHERE \`idPay Rates\` = ${1}`))[0][`Pay Amount`];
        var queryPRDB_Insert = `INSERT INTO mydb.\`employee\`
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
                    ${maxIdE + 1},
                    '${EMPLOYMENT_CODE}',
                    '${removeDiacritics(CURRENT_LAST_NAME)}',
                    '${removeDiacritics(CURRENT_FIRST_NAME)}',
                    ${SOCIAL_SECURITY_NUMBER},
                    '${(Pay_Amount ? Number(Pay_Amount) : 0 / NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH).toFixed(1)}',
                    1,
                    0,
                    5,
                    1
                );`

        await queryPRDBSetOnly(queryPRDB_Insert);

        if ((await queryPRDB(`SELECT \`Employee Number\` FROM mydb.\`employee\` WHERE \`Employee Number\` = '${EMPLOYMENT_CODE}'`)).length
            <= 0) {
            console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE');
            return;
        }

        var EMPLOYMENT_STATUS = `Full time`

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var HIRE_DATE_FOR_WORKING = `${yyyy}-${mm}-${dd}`;

        var WORKERS_COMP_CODE = `JW`;
        var TERMINATION_DATE = null;
        var REHIRE_DATE_FOR_WORKING = null;
        var LAST_REVIEW_DATE = HIRE_DATE_FOR_WORKING;
        var NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH = 22;
        var idPay_Rates = 1;

        await editSpecificInformation(PERSONAL_ID,
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
            BENEFIT_PLANS_ID,
            EMPLOYMENT_CODE,
            EMPLOYMENT_STATUS,
            HIRE_DATE_FOR_WORKING,
            WORKERS_COMP_CODE,
            TERMINATION_DATE,
            REHIRE_DATE_FOR_WORKING,
            LAST_REVIEW_DATE,
            NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH,
            idPay_Rates);

        console.log('[System] employeesManagementController.js | Added new EMPLOYEE');
    } catch (err) {
        console.log('[System] employeesManagementController.js | Cannot Added new EMPLOYEE:', err);
    }
}

module.exports = { addEmployeeInformation };