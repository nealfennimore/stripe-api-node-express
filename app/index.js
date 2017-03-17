require('module-alias/register');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('routes');
const _404 = require('./404');

const { SERVER_IP, SERVER_PORT } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', routes);
app.use(_404);

app.listen(SERVER_PORT, SERVER_IP, ()=> {
    console.log(`Listening on ${SERVER_IP}:${SERVER_PORT}`);
});