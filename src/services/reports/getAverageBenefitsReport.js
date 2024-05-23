const { queryHRDB } = require('../../database/queryHRDB');

const getAverageBenefitsReport = async (id, fullname, planName, totalMonth, totalBenefit) => {
    try {
        sqlQueryHR = ('USE [HumanResourceDB]\n' +
            'SELECT [P].[PERSONAL_ID] AS [ID],\n' +
            '[P].[CURRENT_LAST_NAME] + \' \' + [P].[CURRENT_MIDDLE_NAME] + \' \' + [P].[CURRENT_FIRST_NAME] AS [FULLNAME],\n' +
            '[BP].[PLAN_NAME] AS [PLAN_NAME],\n' +
            'COALESCE(DATEDIFF(MONTH, [E].[HIRE_DATE_FOR_WORKING], COALESCE([E].[TERMINATION_DATE], GETDATE())), 3) AS [TOTAL_MONTH],\n' +
            '[BP].[DEDUCTABLE] * ([BP].[PERCENTAGE_COPAY] / 100.0) * COALESCE(DATEDIFF(MONTH, [E].[HIRE_DATE_FOR_WORKING], \n' +
            'COALESCE([E].[TERMINATION_DATE], GETDATE())), 3) AS [TOTAL_BENEFIT]\n' +
            'FROM [DBO].[PERSONAL] [P]\n' +
            'LEFT JOIN [DBO].[EMPLOYMENT] [E] ON [P].[PERSONAL_ID] = [E].[PERSONAL_ID]\n' +
            'LEFT JOIN [DBO].[BENEFIT_PLANS] [BP] ON [P].[BENEFIT_PLAN_ID] = [BP].[BENEFIT_PLANS_ID]\n' +
            'ORDER BY [TOTAL_BENEFIT] DESC;\n'
        );

        var data = await queryHRDB(sqlQueryHR);

        if (id !== '' && id !== undefined) {
            data = data.filter(record =>
                record.ID == id)
        }

        if (fullname !== '' && fullname !== undefined) {
            data = data.filter(record =>
                record.FULLNAME == fullname)
        }

        if (planName !== '' && planName !== undefined) {
            data = data.filter(record =>
                record.PLAN_NAME.trim() == planName.trim())
        }

        if (totalMonth !== '' && totalMonth !== undefined) {
            data = data.filter(record =>
                record.TOTAL_MONTH == totalMonth)
        }

        if (totalBenefit !== '' && totalBenefit !== undefined) {
            data = data.filter(record =>
                record.TOTAL_BENEFIT == Number(totalBenefit))
        }

        console.log('[System] getAverageBenefitsReport.js | Got AverageBenefitsReport.');

        return data;
    } catch (err) {
        console.log('[System] getAverageBenefitsReport.js | Cannot get AverageBenefitsReport: ', err);
    }
}

module.exports = { getAverageBenefitsReport };