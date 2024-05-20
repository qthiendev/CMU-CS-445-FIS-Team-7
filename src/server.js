const express = require("express");
const app = express();
const port = 3000;
const configViewEngine = require("./configs/viewEngine");
const webRoutes = require("./routers/web.js");
const session = require("express-session");
const db= require("./configs/configDB.js");
db.connect(); 
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    expires: true,
    maxAge: 10 * 60 * 1000,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(cookieParser('KEYMEAT'));
app.use(session({ cookie: { maxAge: 60000 }}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);
app.use("/", webRoutes);

// Local host: for own computer only
app.listen(port, () => {
  console.log(`[SYSTEM] Listening on port ${port}.`);
  console.log(`[SYSTEM] ACCESS LINK: http://localhost:${port}.`);
});

// LAN host: for computer that same internet, note that may ip different
// const ip = '172.25.133.66';
// app.listen(port, ip, () => {
//     console.log(`[SYSTEM] Listening on port ${port}.`);
//     console.log(`[SYSTEM] ACCESS LINK: http://${ip}:${port}.`);
// });
