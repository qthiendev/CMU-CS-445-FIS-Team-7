const path=require('path');
const express=require('express');
const app = express();
const configViewEngine= (app) =>{
    app.set('views', path.join('./src', 'views'));  
    app.set('view engine', 'ejs'); 
    app.use(express.static(path.join('./src', 'Public'))); //
}
    module.exports = configViewEngine;