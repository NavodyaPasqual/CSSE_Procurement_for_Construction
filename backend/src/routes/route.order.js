const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.order');

module.exports = function () {

    router.post('/create', controller.createOrder);

    router.get('/', controller.getAllOrders);

    router.get('/:id', controller.orderById);

    router.delete('/delete/:id', controller.deleteById);

    router.put('/update/status/:id', controller.updateStatusById);
    return router;
}