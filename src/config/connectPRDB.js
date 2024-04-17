const mysql2 = require("mysql2");

const connectionPR = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb',
    port: 3306
});

connectionPR.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to Payroll');
});

module.exports = {connectionPR};