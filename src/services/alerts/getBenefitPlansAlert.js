const { queryMDDB } = require("../../database/queryMDDB");

const getBenefitPlansAlert = async () => {
    try {

        mdQuery = `use ManagerDashboardDB select * from PLAN_CHANGES order by CHANGED_DATE`;
        return await queryMDDB(mdQuery);

    } catch(err) {
     }
}

module.exports = { getBenefitPlansAlert };