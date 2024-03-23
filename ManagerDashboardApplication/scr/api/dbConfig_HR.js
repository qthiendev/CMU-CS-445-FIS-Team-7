//Ensure that the sever is online with port 1433 and enable 'sa' account in SQL Sever Config
//Check Firewall, add/enable 'Port 1433' rule
//Every modules is not work-well yet, please dont touch
//qthiendev

const config = {
    user: 'sa',
    password: '123456789',
    server: 'localhost\\SQLEXPRESS',
    database: 'HumanResourceDB',
    options: {
        //trustedconnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS',
        encrypt: false
    },
    port: 1433
}

module.exports = config;