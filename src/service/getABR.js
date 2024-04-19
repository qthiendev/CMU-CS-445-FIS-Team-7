const {queryHRDB} = require('../service/queryHRDB');

const getABR = async (id, fullname, gender, ethnicity, plan, paid) => {
    try {


        var field = [
            'p.[PERSONAL_ID]',
            '(p.[CURRENT_LAST_NAME] + \' \' + p.[CURRENT_MIDDLE_NAME] + \' \' + p.[CURRENT_FIRST_NAME]) as [FULLNAME]',
            'p.[CURRENT_GENDER]',
            'p.[ETHNICITY]',
            'bp.[PLAN_NAME] as [PLAN]',
            'sum((bp.[DEDUCTABLE] * (bp.[PERCENTAGE_COPAY] / 100))) as [PAID]',
        ];

        var table = [
            '[dbo].[BENEFIT_PLANS] bp', 
            '[dbo].[PERSONAL] p'
        ];

        var criteria = [
            'p.BENEFIT_PLAN_ID = bp.BENEFIT_PLANS_ID'
        ];

        var group = [
            'p.PERSONAL_ID',
            'p.CURRENT_LAST_NAME',
            'p.CURRENT_MIDDLE_NAME',
            'p.CURRENT_FIRST_NAME',
            'p.CURRENT_GENDER',
            'p.ETHNICITY',
            'bp.[PLAN_NAME]'
        ];

        sqlQueryHR = ('use [HumanResourceDB] select '
            + field.join(',')
            + ' from '
            + table.join(',')
            + ' where '
            + criteria.join(' and ')
            + ' group by '
            + group.join(',')
        );

        var data = await queryHRDB(sqlQueryHR);

        if (id !== '' && id !== undefined) {
            data = data.filter(record =>
                record.PERSONAL_ID == id)
        }

        if (fullname !== '' && fullname !== undefined) {
            data = data.filter(record =>
                record.FULLNAME == fullname)
        }
        if (gender !== '' && gender !== undefined) {
            data = data.filter(record =>
                record.CURRENT_GENDER == gender)
        }
        if (ethnicity !== '' && ethnicity !== undefined) {
            data = data.filter(record =>
                record.ETHNICITY.split(" ").join("") == ethnicity)
        }
        if (plan !== '' && plan !== undefined) {
            data = data.filter(record =>
                record.PLAN.replace(/\s+$/, '') == plan)
        }
        if (paid !== '' && paid !== undefined) {
            data = data.filter(record =>
                record.PAID== Number(paid))
        }

        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getABR };