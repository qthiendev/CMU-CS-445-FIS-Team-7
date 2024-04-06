var connections = require('../database/database.js');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connections.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(results);
        });
    });
};
const getUserByID = (id) =>
{
    return new Promise((resolve, reject) => {

        connections.query('SELECT * FROM users where id = ?', [id], (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            let user = results && results.length > 0 ? results[0] : {};

            resolve(user);
        });
    });
}
const updateUserById = (email,password,userId) => {
    return new Promise((resolve, reject) => {

         connections.query(
        `UPDATE users
        SET email= ?, password=?
        WHERE id=?
        `,
        [email,password,userId],
        (err, results) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(results);
        });
    });
};
const deleteUserById=(userId) => {
    return new Promise((resolve, reject) => {

        connections.query(
            ` DELETE FROM users WHERE id= ? `,
             [userId],
             (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });

};

module.exports = {
  
    getAllUsers,
    getUserByID,
    updateUserById,
    deleteUserById
}