const sql = require("mssql");

const config = {
  driver: "msnodesqlv8",
  user: "sa",
<<<<<<< Updated upstream:src/configs/connectHRDB.js
  password: '123456',
=======
  password: "123456",
>>>>>>> Stashed changes:src/config/connectHRDB.js
  server: "localhost",
  database: "HumanResourceDB",
  options: {
    port: 1433,
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectionHR = new sql.ConnectionPool(config);

<<<<<<< Updated upstream:src/configs/connectHRDB.js
connectionHR.connect().then((pool) => {
  console.log("[SYSTEM] Connected to SQL Server | HumanResourceDB.");
})
  .catch((err) => {
    console.error("[SYSTEM] Cannot connect to SQL Server | HumanResourceDB: ", err);
=======
connectionHR
  .connect()
  .then((pool) => {
    console.log("[SYSTEM] Connected to SQL Server | Human Resource Database");
  })
  .catch((err) => {
    console.error(
      "[SYSTEM] Cannot connect to SQL Server | Human Resource Database.\n",
      err
    );
>>>>>>> Stashed changes:src/config/connectHRDB.js
  });

module.exports = { connectionHR };
