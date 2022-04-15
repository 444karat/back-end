const express = require('express');
const DotEnv = require('dotenv');
const morgan = require('morgan');
const logger = require('./middleware/loger.js');

DotEnv.config({path: './config/config.env'});

const app = express();
app.use(express.json());
app.use(logger);
app.use(morgan('short'));
app.use('/api/rooms', require('./routes/rooms.js'));

const port = 8000;
app.listen(
	port,
	console.log(`server start ${process.env.NODE_ENV}  on ${port}`),
);
