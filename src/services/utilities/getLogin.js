const { queryMDDB } = require('../../database/queryMDDB');

const getLogin = async (id, password) => {
    try {
        // SQL INJECTION? Forget it boy
        id = id.replace(/'/g, "''");
        password = password.replace(/'/g, "''");

        sqlQueryMD = ('select ACCOUNT_ID, ACCOUNT_PASSWORD from ACCOUNT where ACCOUNT_ID = \'' + id + '\' and ACCOUNT_PASSWORD = \'' + password + '\'');
        
        var data = await queryMDDB(sqlQueryMD);

        console.log('[System] getLogin.js | Got Login.', data);

        if (data.length > 0)
            return true;

        return false;
    } catch (err) {
        console.log('[System] getLogin.js | Cannot get Login: ', err);
    }
}

module.exports = { getLogin };
