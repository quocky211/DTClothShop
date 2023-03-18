class SiteController {
    home(req, res, next) {
        res.send('cc');
    }
}

module.exports = new SiteController();
// export default SiteController;
