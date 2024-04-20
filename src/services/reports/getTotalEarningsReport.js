const { queryHRDB } = require('../../database/queryHRDB');
const { queryPRDB } = require('../../database/queryPRDB')

const getTotalEarningsReport = async (id, fullname, gender, ethnicity, totalDayWork, totalPaid) => {

    let fieldHR = [
        'p.[PERSONAL_ID]',
        '(p.[CURRENT_LAST_NAME] + \' \' + p.[CURRENT_MIDDLE_NAME] + \' \' + p.[CURRENT_FIRST_NAME]) as [FULLNAME]',
        'p.[CURRENT_GENDER]',
        'p.[ETHNICITY]',
        'jh.[DEPARTMENT]',
        'datediff(day, e.HIRE_DATE_FOR_WORKING, getdate()) as [TOTAL_DAYS_WORKED]',
    ];

    let tableHR = [
        '[dbo].[JOB_HISTORY] jh',
        '[dbo].[PERSONAL] p',
        '[dbo].[EMPLOYMENT] e'
    ];

    let criteriaHR = [
        'e.EMPLOYMENT_ID = jh.EMPLOYMENT_ID',
        'e.PERSONAL_ID = p.PERSONAL_ID'
    ];

    var groupHR = [
    ];

    let sqlQueryHR = ('use [HumanResourceDB] select '
        + fieldHR.join(',')
        + ' from '
        + tableHR.join(',')
        + ' where '
        + criteriaHR.join(' and ')
    );
    
    let querypr = 'select e.idEmployee, pr.`Pay Amount` from employee e, `pay rates` pr where e.`Pay Rates_idPay Rates` = pr.`idPay Rates` order by e.idEmployee'

    let dataHRDB = await queryHRDB(sqlQueryHR);
    let dataPRDB = await queryPRDB(querypr);

    let mergedData = dataHRDB.map(hrItem => {
        let prItem = dataPRDB.find(prItem => prItem.idEmployee === hrItem.PERSONAL_ID);

        if (prItem) {
            let tempTotalPaid = (parseFloat(prItem['Pay Amount']) / 22) * hrItem.TOTAL_DAYS_WORKED;
            return {
                ...hrItem,
                TOTAL_PAID: tempTotalPaid.toFixed(2)
            };
        } else {
            return hrItem;
        }
    });

    if (id !== '' && id !== undefined) {
        mergedData = mergedData.filter(record =>
            record.PERSONAL_ID == id)
    }

    if (fullname !== '' && fullname !== undefined) {
        mergedData = mergedData.filter(record =>
            record.FULLNAME == fullname)
    }
    if (gender !== '' && gender !== undefined) {
        mergedData = mergedData.filter(record =>
            record.CURRENT_GENDER == gender)
    }
    if (ethnicity !== '' && ethnicity !== undefined) {
        mergedData = mergedData.filter(record =>
            record.ETHNICITY.split(" ").join("") == ethnicity)
    }
    if (totalDayWork !== '' && totalDayWork !== undefined) {
        mergedData = mergedData.filter(record =>
            record.TOTAL_DAYS_WORKED == Number(totalDayWork))
    }
    if (totalPaid !== '' && totalPaid !== undefined) {
        mergedData = mergedData.filter(record =>
            record.TOTAL_PAID == Number(totalPaid))
    }

    return mergedData;

}

module.exports = { getTotalEarningsReport };

