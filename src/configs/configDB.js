const mongoose= require('mongoose')
async function  connect(){
    try {
       await mongoose.connect("mongodb+srv://truong1003:dSvPkLBbRlV09p6q@cluster0.gy5dxz4.mongodb.net/dashboard")
       console.log("Connected thanh cong ")
    } catch (error) {
        console.log('fail')
    }
}

module.exports= { connect }