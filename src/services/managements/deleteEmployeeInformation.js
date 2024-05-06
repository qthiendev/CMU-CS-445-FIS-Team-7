const { queryHRDBSetOnly, queryHRDB } = require('../../database/queryHRDB');
const { queryPRDBSetOnly, queryPRDB } = require('../../database/queryPRDB');

const deleteFromEmployee = async (EMPLOYMENT_CODE, idE) => {
    await queryPRDBSetOnly(`DELETE FROM mydb.employee WHERE \`Employee Number\` = '${EMPLOYMENT_CODE}';`);
    await queryPRDBSetOnly(`UPDATE mydb.employee SET \`idEmployee\` = \`idEmployee\` - 1 WHERE \`idEmployee\` > ${idE};`);
}

const deleteFromHRDB = async (eID) => {
    await queryHRDBSetOnly(`USE [HumanResourceDB]
        DELETE FROM [DBO].[JOB_HISTORY] WHERE [EMPLOYMENT_ID]               = ${eID};
        DELETE FROM [DBO].[EMPLOYMENT_WORKING_TIME] WHERE [EMPLOYMENT_ID]   = ${eID};
        DELETE FROM [DBO].[EMPLOYMENT] WHERE [EMPLOYMENT_ID]                = ${eID};`);

    await queryHRDBSetOnly(`USE [HumanResourceDB]
        UPDATE [DBO].[EMPLOYMENT] SET [EMPLOYMENT_ID]               = [EMPLOYMENT_ID] - 1 WHERE [EMPLOYMENT_ID] > ${eID};
        UPDATE [DBO].[JOB_HISTORY] SET [EMPLOYMENT_ID]              = [EMPLOYMENT_ID] - 1 WHERE [EMPLOYMENT_ID] > ${eID};
        UPDATE [DBO].[EMPLOYMENT_WORKING_TIME] SET [EMPLOYMENT_ID]  = [EMPLOYMENT_ID] - 1 WHERE [EMPLOYMENT_ID] > ${eID};`);
}

const deleteEmployeeInformation = async (EMPLOYMENT_CODE) => {
    try {
        var idE = (await queryPRDB(`SELECT \`idEmployee\` FROM mydb.employee WHERE \`Employee Number\` = '${EMPLOYMENT_CODE}';`))[0][`idEmployee`];
        await deleteFromEmployee(EMPLOYMENT_CODE, idE);

        var eID = (await queryHRDB(`USE [HumanResourceDB] SELECT [EMPLOYMENT_ID] FROM [DBO].[EMPLOYMENT] WHERE [EMPLOYMENT_CODE] = '${EMPLOYMENT_CODE}';`))[0][`EMPLOYMENT_ID`];
        await deleteFromHRDB(eID);

        console.log('Deleted employee');
    } catch (err) {
        console.log('Fail Deleted employee', err);
    }
}

module.exports = { deleteEmployeeInformation };
