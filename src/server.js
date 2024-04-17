const express = require("express");
const app = express();
const port = 3000;
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routers/web.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);
app.use("/", webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
