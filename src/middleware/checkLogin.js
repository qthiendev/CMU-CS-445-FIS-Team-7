const isLoggedInMiddleware = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
        // return res.redirect('/Login'); 
    }
    
    next();
};

module.exports = isLoggedInMiddleware;
