var config = require('./dbConfig_HR')
var sql = require('mssql');

async function execute(request) {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(request);
        return data.recordsets;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { execute: execute }