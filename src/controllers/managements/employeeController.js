const { getAllInformation } = require('../../services/managements/processEmployee');
const { getInformation } = require('../../services/managements/processEmployee');

const renderManageAllEmployeesView = async (req, res) => {
    try {
        let data = await getAllInformation();

        res.render(
            "manageAllEmployeesPage.ejs",
            {
                data
            }
        );
        console.log('[System] employeeController.js | Rendered manageAllEmployeesPage.');
    }
    catch (err) {
        console.log('[System] Error at employeeController.js | renderManageAllEmployeesView: ', err);
    }
}

const renderManageEmployeeView = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await getInformation(id);

        res.render(
            "manageEmployeePage.ejs",
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

module.exports = {
    renderManageAllEmployeesView,
    renderManageEmployeeView
};