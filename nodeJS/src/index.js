const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpError = require('http-errors');
require('dotenv').config();
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3001;
const cors = require('cors');
const orderRouter = require('./routes/order');
require('dotenv').config();
require('./helpers/connection_redis');

// morgan: bắn ra log khi gửi yêu cầu lên server
// app.use(morgan('combined'));
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/order', orderRouter);
route(app);

db.connect();

app.use((req, res, next) => {
    // const error = new Error('Not found');
    // error.status = 500;
    // next(error);
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log(req);
    next(httpError.NotFound('This route does not exists.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
