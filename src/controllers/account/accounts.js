

class Index{
    accounts(req,res){
        res.render('accounts.ejs')
    }

    permissions(req, res){
        res.render('permissions.ejs')
    }

    roles(req, res){
        res.render('roles.ejs')

}
}
module.exports = new Index