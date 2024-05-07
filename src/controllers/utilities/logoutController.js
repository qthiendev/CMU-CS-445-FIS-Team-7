const logout = (req, res) => {
    if (req.session.isLoggedIn){
        delete req.session.isLoggedIn;
        return res.redirect('/Login'); 
}
};
module.exports = logout;