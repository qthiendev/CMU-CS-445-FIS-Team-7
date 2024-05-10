const Accounts=require("../../models/accounts");

class index {
    //[GET]/auth/login
    async login(req,res){
        res.render("loginPage.ejs")
           
    }

    async homePage(req,res){
        res.render("homePage.ejs")
 
    }

    async loginPost(req,res){
        const email=req.body.email
        const password=req.body.password


        const user = await Accounts.findOne({
            email : email,
            deleted : false
        })

        if(!user){
            res.redirect("back")
            return
        }   

        if(password != user.password){
            res.redirect("back")
            return
        }
        res.cookie("token", user.token)
        res.redirect("homePage")
    }

    logout(req,res){
        res.clearCookie("token")
        res.redirect(`login`)
    }
}

module.exports = new index
