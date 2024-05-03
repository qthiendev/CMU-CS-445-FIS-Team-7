const { addPersonalInformation } = require('../../services/managements/addPersonalInformation');
const { getInformationByPersonalID } = require('../../services/managements/getSpecificInformation');
const { queryHRDB } = require('../../database/queryHRDB');

const addNewPersonalInformation = async (req, res) => {
    try {
        const {
            PERSONAL_ID,
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
            BENEFIT_PLANS_ID
        } = req.query;

        console.log(req.query);

        await addPersonalInformation(PERSONAL_ID,
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
            BENEFIT_PLANS_ID);

        console.log('[System] employeesManagementController.js | Added new PERSONAL:'   );
        let data = await getInformationByPersonalID(PERSONAL_ID);

        res.render(
            "manageInformationSpecificPage.ejs",
            {
                data,
                id: PERSONAL_ID
            }
        );
    } catch (err) {
        console.log('[System] employeesManagementController.js | Cannot Added new PERSONAL:', err);
    }
}

const renderAddPersonalPage = async (req, res) => {
    try {
        const {
            PERSONAL_ID,
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
            BENEFIT_PLANS_ID
        } = req.query;

        const maxPersonalId = (await queryHRDB(`use [HumanResourceDB] SELECT MAX([PERSONAL_ID]) as maxId FROM [DBO].[PERSONAL]`))[0]['maxId'];
        const maxBenefitID = (await queryHRDB(`use [HumanResourceDB] SELECT MAX([BENEFIT_PLANS_ID]) as maxId FROM [DBO].[BENEFIT_PLANS]`))[0]['maxId'];

        const personalId = maxPersonalId + 1;
        let benefitPlansId = Number(BENEFIT_PLANS_ID ? BENEFIT_PLANS_ID : 1);
        benefitPlansId = benefitPlansId > maxBenefitID ? maxBenefitID : benefitPlansId;
        benefitPlansId = benefitPlansId < 0 ? 1 : benefitPlansId;

        const BENEFIT_PLANS_DATA = (await queryHRDB(`use [HumanResourceDB] SELECT * FROM [BENEFIT_PLANS] WHERE [BENEFIT_PLANS_ID] = ${benefitPlansId}`))[0];

        res.render("manageAddPersonalPage.ejs", {
            PERSONAL_ID: personalId,
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
            BENEFIT_PLANS_ID: BENEFIT_PLANS_DATA.BENEFIT_PLANS_ID,
            PLAN_NAME: BENEFIT_PLANS_DATA.PLAN_NAME,
            DEDUCTABLE: BENEFIT_PLANS_DATA.DEDUCTABLE,
            PERCENTAGE_COPAY: BENEFIT_PLANS_DATA.PERCENTAGE_COPAY,
        });

        console.log('[System] employeesManagementController.js | Rendered manageInformationPage.');
    } catch (err) {
        console.log('[System] employeesManagementController.js | Cannot render manageInformationPage:', err);
    }
}

module.exports = {
    addNewPersonalInformation,
    renderAddPersonalPage
}
