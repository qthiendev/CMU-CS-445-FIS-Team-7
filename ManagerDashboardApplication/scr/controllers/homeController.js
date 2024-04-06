var connections = require('../database/database.js');
const{getAllUsers, getUserByID,updateUserById,deleteUserById} = require('../services/CRUD.js');
const{getAccounts}=require('../services/checkAccount.js');
const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const getLoginpage= async(req,res)=>{
    let results = await getAccounts();
    var getAllAccounts = results.map(user => ({ email: user.email, password: user.password }));
    return res.render('login.ejs', { getAllAccounts }); 
}


const getHomepage = async (req, res) => {

        try {
            let results = await getAllUsers();           
            const listUsers = results.map(user => ({ id: user.id, email: user.email, password: user.password }));
            return res.render('homePage.ejs', { listUsers });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Lỗi Server Nội bộ');
        }
  
    
};
const postCreateUser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if(email && password){
            await connections.query(
                `INSERT INTO users (email, password) VALUES (?, ?)`,
                [email, password]
                );
            
            res.redirect('/homePage');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


const getCreatePage=(req,res)=>{
    
    return res.render('create.ejs')
}
const getUpdatePage= async (req,res)=>{
    const userId = req.params.userId;

    try {
       
        let user = await getUserByID(userId);
       
        res.render('edit.ejs', { userEdit: user }); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Lỗi Server Nội bộ');
    }
}
const  postUpdateUser= async (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;
    let userId = req.body.userId;
    await updateUserById(email, password,userId);
    res.redirect('/homePage')
  

}

const getHelloWorld = (req, res) => {
    
     res.render('homePage.ejs');
};
const postDeleteUser= async (req, res) => {
    const userId = req.params.userId;

    try {
       
        let user = await getUserByID(userId);
       
        res.render('delete.ejs', { userEdit: user }); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Lỗi Server Nội bộ');
    }
   
};
const postRemoveUser= async(req, res) => {
    const userId = req.body.userId;
   
       await deleteUserById(userId);
    res.redirect('/homePage')
};
module.exports = {
    getLoginpage,
    getHomepage,
    getHelloWorld,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postRemoveUser,
    
};
