const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.item');

module.exports = function () {
    router.post('/create', controller.createItem);

    router.get('/', controller.getAllItems);

    router.get('/:id', controller.itemById);

    router.delete('/delete/:id', controller.deleteById);

    router.put('/update/:id', controller.updateById);

    router.get('/items/count', controller.countItems);
    return router;
}