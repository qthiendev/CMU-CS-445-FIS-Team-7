const { getLogin } = require('../../services/utilities/getLogin');

const renderLoginView = async (req, res) => {
    try {
        let id = req.query.id;
        let password = req.query.password;

        console.log(req.query)

        let isValid = await getLogin(id, password);

        if (isValid)
            await res.redirect("/");
        else
            await res.render("loginPage.ejs", { error: 'Invalid login credentials. Please try again.' });
        
        console.log('[System] loginController.js | Rendered loginPage.');
    }
    catch (err) {
        console.log('[System] Error at loginController.js: ', err);
    }
}

module.exports = { renderLoginView };