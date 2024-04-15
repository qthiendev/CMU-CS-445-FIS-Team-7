const {getHumanPayrollList}=require('../service/getHumanPayrollList.js');
const getHomepage = async (req, res) => {
    let getAllHumanPayroll=await getHumanPayrollList();
    return res.render('homePage.ejs',{getAllHumanPayrol})
}
module.exports={
    getHomepage, 
}