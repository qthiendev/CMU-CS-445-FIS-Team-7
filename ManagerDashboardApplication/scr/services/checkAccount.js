
const connections = require('../database/database.js');


const getAccounts = () => {
    return new Promise((resolve, reject) => {
        connections.query('SELECT * FROM accounts', (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(results);
        });
    });
};
const checkAccounts=async (email,password)=>{
    try {
        let results = await getAccounts();           
        const listAccounts = results.map(accounts => ({email: accounts.email, password: accounts.password }));    
        console.log(listAccounts);
        for(let i=0; i<listAccounts.length; i++) {
            if(email === listAccounts[i].email&&password === listAccounts[i].password)
                return true;
        }
            return false;
    } catch (err) {
      
    }
}

module.exports = {
    getAccounts,
  checkAccounts
};