const mysql2 = require("mysql2");

config = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mydb",
  port: 3306,
};

const connectionPR = mysql2.createConnection(config);

connectionPR.connect((err) => {
  if (err) {
    console.error("[SYSTEM] Cannot connect to MySQL Server | mydb: ", err);
    return;
  }
  console.log("[SYSTEM] Connected to MySQL Server | mydb.");
});

module.exports = { connectionPR };
