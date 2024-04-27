const sql = require("mssql");

const config = {
  driver: "msnodesqlv8",
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "ManagerDashboardDB",
  options: {
    port: 1433,
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectionMD = new sql.ConnectionPool(config);

connectionMD
  .connect()
  .then((pool) => {
    console.log("[SYSTEM] Connected to SQL Server | ManagerDashboardDB.");
  })
  .catch((err) => {
    console.error(
      "[SYSTEM] Cannot connect to SQL Server | ManagerDashboardDB: ",
      err
    );
  });

module.exports = { connectionMD };
