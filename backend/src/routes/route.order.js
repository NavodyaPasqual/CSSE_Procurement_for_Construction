const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.order');

module.exports = function () {

    router.post('/create', controller.createOrder);

    router.get('/', controller.getAllOrders);

    router.get('/:id', controller.orderById);

    router.delete('/delete/:id', controller.deleteById);

    router.put('/update/status/:id', controller.updateStatusById);

    router.put('/update/delivery-status/:id', controller.updateDeliveryStatusById);

    router.get('/orders/count', controller.countOrders);

    router.get('/status-approved/count', controller.countApprovalStatusApproved);

    router.get('/status-not-approved/count', controller.countApprovalStatusNotApproved);

    router.get('/status-not-decided/count', controller.countApprovalStatusNotDecided);

    router.get('/status-delivered/count', controller.countDeliveredStatusDelivered);

    router.get('/status-not-delivered/count', controller.countDeliveredStatusNotDelivered);

    router.get('/status-pending/count', controller.countDeliveredStatusPending);
    return router;
}