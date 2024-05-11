const Roles=require("../../models/roles");
const Accounts=require("../../models/accounts");
const { json } = require("express")

class Index{
    async accounts(req,res){
        let find = {
            deleted :false
        }

        const records = await Accounts.find(find).select("-password -token")

        for (const record of records) {
            const role = await Roles.findOne({
                deleted : false,
                _id : record.role_id
            })

            record.role=role
        }
        res.render('accounts/accounts.ejs',{
            records : records
        })
    }

    async createAccount(req,res){
                const roles = await Roles.find({deleted : false})
        
                res.render("accounts/create.ejs",{
                    roles : roles
                })
            }

    async createAccountPost(req,res){
        
        const emailExit = await Accounts.findOne({
            email: req.body.email,
            deleted: false
        })

        if(emailExit){
            req.flash("error",`Email ${req.body.email} đã tồn tại`)
            res.redirect("back")
        }else{
            req.body.password=req.body.password

            const record = new Accounts(req.body)
            await record.save()

        res.redirect(`/Accounts`)
        }
    }

    async editAccount(req,res){
        let find = {
            _id : req.params.id,
            deleted: false
        }

        const data = await Accounts.findOne(find)
        const roles = await Roles.find({deleted: false})

        res.render("accounts/edit",{
            data: data,
            roles: roles
        })

    }

    async editAccountPost(req,res){


            await Accounts.updateOne({_id:req.params.id}, req.body)
        

            res.redirect(`/Accounts`)
    }

    async deleteAccount(req,res){
        const id= req.params.id
        console.log(id)
        await Accounts.deleteOne({_id:id})

        res.redirect("back")
    }
    
        async permission(req,res){
            let find ={
                deleted : false
            }
    
            const records = await Roles.find(find)
    
            res.render("roles/permission.ejs",{
                titlePage: "Phân quyền",
                records : records
            })
        }

        async permissionPatch(req,res){
            const permission = JSON.parse(req.body.permissions)
            for (const item of permission) {
                await Roles.updateOne({_id: item.id},{permission:item.permission})
            }
    
            res.redirect("back")
        }
       
    

    async roles(req, res){

        const find={
            deleted:false
        }

        const records = await Roles.find(find)

        res.render('roles/roles.ejs',{records:records})

   }
   async create(req, res){
        res.render('roles/create.ejs')
    }

    async createPost(req, res){
        const record = new Roles(req.body)
        await record.save()

        res.redirect('/Roles')
    }

    async edit(req,res){
        const find={
            deleted:false,
            _id:req.params.id
        }

        const data= await Roles.findOne(find)
        res.render("roles/edit.ejs",{
            data: data
        })
    }

    async editRoles(req,res){
       
        await Roles.updateOne({_id:req.params.id},req.body)

        res.redirect('/Roles')
    }

    async deleteRole(req,res){
        const id= req.params.id
        console.log(id)
        await Roles.deleteOne({_id:id})

        res.redirect("back")
    }

}
module.exports = new Index