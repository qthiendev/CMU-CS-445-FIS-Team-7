const { queryHRDBSetOnly, queryHRDB } = require('../../database/queryHRDB');

const nullCheck = (value, type = 'string') => {
    if (value) {
        return type === 'string' ? `N'${value}'` : `${Number(value)}`;
    }
    return `NULL`;
};

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
        const queryHRDB_PersonalInsert = `use [HumanResourceDB]
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

        await queryHRDBSetOnly(queryHRDB_PersonalInsert);
    } catch (err) {
        console.error('Error while adding personal information:', err);
    }
}

module.exports = {
    addPersonalInformation
};
