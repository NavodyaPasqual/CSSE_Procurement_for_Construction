const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.supplier');

module.exports = function () {
    router.post('/create', controller.createSupplier);

    router.get('/', controller.getAllSuppliers);

    router.get('/:id', controller.siteById);

    router.delete('/delete/:id', controller.deleteById);

    router.put('/update/:id', controller.updateById);

    router.get('/suppliers/count', controller.countSuppliers);
    return router;
}