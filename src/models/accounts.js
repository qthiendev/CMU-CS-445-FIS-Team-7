const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generate=require('../helper/generate')

const Accounts = new Schema({
  fullName:  String,
  email: String,
  password: String,
  token: {
    type: String,
    default : generate.generateRandomString(20)
  },
  phone: String,
  avatar: String,
  role_id: String,
  deleted: {
    type : Boolean,
    default : false
  },
  deletedAt : Date,
},{
  timestamps :true
})

module.exports=mongoose.model('Accounts', Accounts, 'accounts');