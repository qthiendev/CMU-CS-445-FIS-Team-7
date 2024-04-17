const sql = require("mssql");

const config = {
  driver: "msnodesqlv8",
  user: "sa",
  password:'123456',
  server: "localhost",
  database: "HumanResourceDB",
  options: {
    port: 1433,
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectionHR = new sql.ConnectionPool(config);

connectionHR.connect().then((pool) => {
    console.log("[SYSTEM] Connected to SQL Server | Human Resource Database");
  })
  .catch((err) => {
    console.error("[SYSTEM] Cannot connect to SQL Server | Human Resource Database.\n", err);
  });

  module.exports = {connectionHR};
