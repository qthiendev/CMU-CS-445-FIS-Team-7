const { getInformationByPersonalID } = require('../../services/managements/getSpecificInformation');

const renderSpecificInformationView = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await getInformationByPersonalID(id);

        res.render(
            "manageInformationSpecificPage.ejs",
            {
                data,
                id
            }
        );
        console.log('[System] employeeController.js | Rendered manageEmployeePage.');
    }
    catch (err) {
        console.log('[System] Error at employeeController.js | renderManageEmployeeView: ', err);
    }
}

module.exports = { renderSpecificInformationView };