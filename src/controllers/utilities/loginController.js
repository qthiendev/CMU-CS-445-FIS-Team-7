const { getLogin } = require('../../services/utilities/getLogin');

const tryLogin = async (req, res) => {
    try {

        let id = req.query.id;
        let password = req.query.password;
        let isValid = await getLogin(id, password);

        if (isValid) {
            req.session.isLoggedIn = true;
            res.redirect("/");
        } else {
            res.render("loginPage.ejs", { error: "Sorry, we are having trouble signing you in right now. Please try again later. " });
        }

    } catch (err) {
        res.render("loginPage.ejs", { error: "Sorry, we are having trouble signing you in right now. Please try again later. " });
    }
}

const renderLoginView = async (req, res) => {
    try {

        if (req.session.isLoggedIn)
            res.redirect("/");
        res.render("loginPage.ejs", { error: "" });

    } catch (err) {
        console.log('[System] Error at loginController.js: ', err);
    }
}

module.exports = { 
    renderLoginView,
    tryLogin
 };
