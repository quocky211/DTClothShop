// import siteRouter from './site.js';
const siteRouter = require('./site');
const adminRouter = require('./admin');

const route = (app) => {
    app.use('/', siteRouter);
    app.use('/admin', adminRouter);
};
module.exports = route;
