const { queryHRDBSetOnly, queryHRDB } = require('../../database/queryHRDB');

const { deleteEmployeeInformation } = require('../managements/deleteEmployeeInformation');

const detelePersonalInformation = async (PERSONAL_ID) => {

    try {
        try {
            var employmentID = (await queryHRDB(`USE [HumanResourceDB] SELECT [EMPLOYMENT_ID] FROM [DBO].[EMPLOYMENT] WHERE [PERSONAL_ID] = ${PERSONAL_ID}`))[0]['EMPLOYMENT_ID'];
            var employmentCode = (await queryHRDB(`USE [HumanResourceDB] SELECT [EMPLOYMENT_CODE] FROM [DBO].[EMPLOYMENT] WHERE [EMPLOYMENT_ID] = ${employmentID}`))[0]['EMPLOYMENT_CODE'];
            console.log(employmentCode)
            await deleteEmployeeInformation(employmentCode);

            await queryHRDB(`USE [HumanResourceDB] DELETE FROM [DBO].[PERSONAL] WHERE [PERSONAL_ID] = ${PERSONAL_ID}`);

            await queryHRDBSetOnly(`USE [HumanResourceDB]
                UPDATE [DBO].[PERSONAL] SET [PERSONAL_ID]       = [PERSONAL_ID] - 1 WHERE [PERSONAL_ID] > ${PERSONAL_ID};
                UPDATE [DBO].[EMPLOYMENT] SET [PERSONAL_ID]     = [PERSONAL_ID] - 1 WHERE [PERSONAL_ID] > ${PERSONAL_ID};`); 
        } catch(err) {
            console.log(err);
            await queryHRDB(`USE [HumanResourceDB] DELETE FROM [DBO].[PERSONAL] WHERE [PERSONAL_ID] = ${PERSONAL_ID}`);

            await queryHRDBSetOnly(`USE [HumanResourceDB]
                UPDATE [DBO].[PERSONAL] SET [PERSONAL_ID]       = [PERSONAL_ID] - 1 WHERE [PERSONAL_ID] > ${PERSONAL_ID};`);
        }
    } catch (err) {

    }
}

module.exports = { detelePersonalInformation };