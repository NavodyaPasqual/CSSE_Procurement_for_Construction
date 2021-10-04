const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.site');

module.exports = function () {
    router.post('/create', controller.createSite);

    router.get('/', controller.getAllSites);

    router.get('/:id', controller.siteById);

    router.delete('/delete/:id', controller.deleteById);

    router.put('/update/:id', controller.updateById);

    router.get('/sites/count', controller.countSites);
    return router;
}