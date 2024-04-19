const { queryHRDB } = require('../service/queryHRDB');

const getVDR = async (id, fullname, gender, ethnicity, shareholder, workType, vacationDays, year) => {
    try {


        var field = [
            'p.[PERSONAL_ID]',
            '(p.[CURRENT_LAST_NAME] + \' \' + p.[CURRENT_MIDDLE_NAME] + \' \' + p.[CURRENT_FIRST_NAME]) as [FULLNAME]',
            'p.[CURRENT_GENDER]',
            'p.[ETHNICITY]',
            '(case when p.[SHAREHOLDER_STATUS] = 1 then \'Yes\' else \'No\' end) as [SHAREHOLDER]',
            'e.[EMPLOYMENT_STATUS]',
            'sum(ewt.[TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH]) as [TOTAL_VACATION_DAYS]'
        ];

        var table = [
            '[dbo].[EMPLOYMENT_WORKING_TIME] [ewt]',
            '[dbo].[PERSONAL] [p]',
            '[dbo].[EMPLOYMENT] [e]',
        ];

        let cYear = (year !== 'all') && year !== undefined ? ' and YEAR(ewt.YEAR_WORKING) = YEAR(\'' + year + '\')' : '';

        var criteria = [
            'e.PERSONAL_ID = p.PERSONAL_ID',
            'e.EMPLOYMENT_ID = ewt.EMPLOYMENT_ID',
            'e.EMPLOYMENT_STATUS != \'Terminated\'' + cYear,
        ];

        var group = [
            'p.PERSONAL_ID',
            'p.CURRENT_LAST_NAME',
            'p.CURRENT_MIDDLE_NAME',
            'p.CURRENT_FIRST_NAME',
            'p.CURRENT_GENDER',
            'p.ETHNICITY',
            'p.SHAREHOLDER_STATUS',
            'e.EMPLOYMENT_STATUS'
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
        if (shareholder !== '' && shareholder !== undefined) {
            data = data.filter(record =>
                record.SHAREHOLDER == shareholder)
        }
        if (workType !== '' && workType !== undefined) {
            data = data.filter(record =>
                record.EMPLOYMENT_STATUS.replace(/\s+$/, '') == workType)
        }
        if (vacationDays !== '' && vacationDays !== undefined) {
            data = data.filter(record =>
                record.TOTAL_VACATION_DAYS == vacationDays)
        }
        //console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getVDR };