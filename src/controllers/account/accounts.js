const Roles=require("../../models/roles");
const { json } = require("express")

class Index{
    accounts(req,res){
        res.render('accounts.ejs')
    }

    permissions(req, res){
        res.render('permissions.ejs')
    }

    async roles(req, res){

        const roles = await Roles.find({deleted: false})


        res.render('roles.ejs', {roles: roles})

}
}
module.exports = new Index