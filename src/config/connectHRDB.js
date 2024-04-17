const sql = require("mssql");

const configNhan = {
  driver: "msnodesqlv8",
  user: "sa",
  password:'123456',
  server: "DESKTOP-CSR23GF\\THANHNHAN",
  database: "HumanResourceDB",
  options: {
    port: 1433,
    encrypt: true,
    trustServerCertificate: true,
  },
};

const configThien = {
  driver: "msnodesqlv8",
  user: "sa",
  password:'123456789',
  server: "DESKTOP-53ZIE",
  database: "HumanResourceDB",
  options: {
    port: 1433,
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectionHR = new sql.ConnectionPool(configThien);

connectionHR.connect().then((pool) => {
    console.log("Connected to HumanResource");
  })
  .catch((err) => {
    console.error("Error connecting to SQL Server:", err);
  });

  module.exports = {connectionHR};
