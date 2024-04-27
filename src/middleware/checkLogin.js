const isLoggedInMiddleware = (req, res, next) => {
    if (!req.session.hasOwnProperty('isLoggedIn')) {
        return res.redirect('/login');
    }
    next();
};

module.exports = isLoggedInMiddleware;
