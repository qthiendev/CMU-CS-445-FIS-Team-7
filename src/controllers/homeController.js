const {querryHRDB} = require('../service/querryHRDB.js');
const {querryPRDB} = require('../service/querryPRDB.js');

const getHomepage = async (req, res) => {
    let getHR = await querryHRDB();
    return res.render('homePage.ejs',{getHR})
}

module.exports={
    getHomepage, 
}