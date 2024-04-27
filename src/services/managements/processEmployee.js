const { queryHRDB } = require('../../database/queryHRDB');
const { queryPRDB } = require('../../database/queryPRDB');

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
    const data = getAllInformation();
    
}

const setInformation = async (id) => {

}

module.exports = {
    getAllInformation,
    getInformation,
    setInformation,
}