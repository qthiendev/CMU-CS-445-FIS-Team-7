var http = require('http');
var app = require('./app')

var port = process.env.PORT || 5500;
var server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});