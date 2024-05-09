const { queryMDDB } = require("../../database/queryMDDB");

const getBenefitPlansAlert = async () => {
    try {

        mdQuery = `use ManagerDashboardDB select * from PLAN_CHANGES`;
        return await queryMDDB(mdQuery);

    } catch(err) {
        console.log(err);
    }
}

module.exports = { getBenefitPlansAlert };