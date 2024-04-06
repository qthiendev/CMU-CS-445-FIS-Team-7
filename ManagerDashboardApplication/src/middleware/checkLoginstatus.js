const checkLoginStatus = (req, res, next) => {
    if (req.session && req.session.user) {  
        next();
    } else {      
        res.redirect('/');
    }
};

module.exports = checkLoginStatus;
