const express = require("express");
const app = express();
const port = 3000;
const configViewEngine = require("./configs/viewEngine");
const webRoutes = require("./routers/web.js");
const session = require('express-session');
// const connectRedis = require('connect-redis').default; // Import connect-redis with default syntax

// const redis = require('redis');
// const redisClient = redis.createClient();

// const RedisStore = connectRedis(session); // Call connectRedis with session

app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,
    // store: new RedisStore({ client: redisClient }),
    cookie: {
        maxAge: 10 * 60 * 1000 
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);
app.use("/", webRoutes);

app.listen(port, () => {
    console.log(`[SYSTEM] Listening on port ${port}.`);
});
