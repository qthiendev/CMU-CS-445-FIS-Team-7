var express = require('express');
var queryHR = require('../api/dbQuery_HR');
var app = express()

app.use((request, response, next) => {
    queryHR.execute("SELECT * FROM Personal;")
    .then(recordList => {
        const emails = recordList[0].map(record => record.Email);
        response.status(200).json(recordList);
    })
    .catch(error => {
        response.status(500).json({ message: error });
        console.error(error);
    });
});

module.exports = app;