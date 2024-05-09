const { queryMDDB } = require('../../database/queryMDDB');

const getLogin = async (id, password) => {
    try {
        // SQL INJECTION? Forget it boy
        id = id.replace(/'/g, "''");
        password = password.replace(/'/g, "''");

        var sqlQueryMD = ('select [USER_ACCOUNT], [USER_PASSWORD] from [USERS] where [USER_ACCOUNT] = \'' + id + '\' and [USER_PASSWORD] = \'' + password + '\'');
        
        var data = await queryMDDB(sqlQueryMD);

        console.log('[System] getLogin.js | Got Login.', data);

        if (data.length > 0)
            return true;
        
        return false; // Trả về false khi không tìm thấy thông tin đăng nhập hợp lệ
    } catch (err) {
        console.log('[System] getLogin.js | Cannot get Login: ', err);
        return false;
    }
}
module.exports = { getLogin };
