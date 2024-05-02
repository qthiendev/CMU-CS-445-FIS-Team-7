const express = require("express");
const app = express();
const port =3000 ;
const configViewEngine = require("./configs/viewEngine");
const webRoutes = require("./routers/web.js");
const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    expires: true,
    maxAge: 10 * 60 * 1000,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);
app.use("/", webRoutes);

// Local host: for own computer only
app.listen(port, () => {
    console.log(`[SYSTEM] Listening on port ${port}.`);
   
});

// LAN host: for computer that same internet, note that may ip different
// const ip = '172.25.133.66';
// app.listen(port, ip, () => {
//     console.log(`[SYSTEM] Listening on port ${port}.`);
//     console.log(`[SYSTEM] ACCESS LINK: http://${ip}:${port}.`);
// });

// LAN host: for computer that same internet, note that may ip different


