const express = require('express');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3001;

// morgan: bắn ra log khi gửi yêu cầu lên server
// app.use(morgan('combined'));

route(app);

db.connect();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
