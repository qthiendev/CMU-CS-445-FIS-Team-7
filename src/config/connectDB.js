const sql = require('mssql');
const mysql = require('mysql');
//connectHR
const config = {
    server: 'THANHNHAN', 
    database: 'HumanResourceDB',
    options: {
        trustServerCertificate: true, 
    },
};

const connectionHR = new sql.ConnectionPool(config);

connectionHR.connect().then(pool => {
    console.log('Connected to HumanResource');
}).catch(err => {
    console.error('Error connecting to SQL Server:', err);
});

//connectPR
// const connectionPR = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'mydb', 
//     port: 3306
// });
// connectionPR.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to Payroll');
// });
  
  module.exports = {connectionHR};