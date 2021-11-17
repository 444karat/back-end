const express = require("express");
const  bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');

const PORT = process.env.PORT || 5000;
const app = express();



app.listen(PORT, ()=> {console.log(`сервер на ${PORT}`);});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./route/auth.js'));
app.use('/api', require('./route/user.js'));
