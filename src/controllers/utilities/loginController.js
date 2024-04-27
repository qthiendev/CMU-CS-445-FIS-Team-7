const { getLogin } = require('../../services/utilities/getLogin');

const renderLoginView = async (req, res) => {
    try {
        let id = req.query.id;
        let password = req.query.password;
        let isValid = await getLogin(id, password);
        if (isValid){
            req.session.isLoggedIn = true;
            console.log(">>>>>>>>>>>>>>", req.session);
            res.redirect("/");
        }
        else{
             res.render("loginPage.ejs", { error: 'Invalid login credentials. Please try again.' });
        }
    }
    catch (err) {
        console.log('[System] Error at loginController.js: ', err);
    }
}

module.exports = { renderLoginView };
