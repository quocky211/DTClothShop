// import siteRouter from './site.js';
const siteRouter = require('./site');
const adminRouter = require('./admin');
const productRouter = require('./product');

const route = (app) => {
    app.use('/admin', adminRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);
};
module.exports = route;
