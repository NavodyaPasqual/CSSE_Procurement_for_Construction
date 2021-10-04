const Order = require('../modules/module.order');

const createOrder = async (req, res) => {
    if(req.body) {
        const order = new Order(req.body);
        await order.save()
            .then(data=>{
                res.status(200).send({data: data});
            })
            .catch(error =>{
                res.status(500).send({error: error.message});
            });
    }
}

const getAllOrders = async (req, res) => {
    await Order.find({})
        .populate('item1', 'name itemID')
        .populate('item2', 'name itemID')
        .populate('item3', 'name itemID')
        .populate('site', 'name siteID')
        .populate('supplier', 'name supplierID')
        .then(data=>{
            res.status(200).send({data: data});
        })
        .catch(error =>{
            res.status(500).send({error: error.message});
        });
}

const orderById = async (req, res) => {
    if (req.params && req.params.id) {
        await Order.findById(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const updateStatusById = async (req, res) => {
    const id = req.params.id;
    const {status} = req.body;
    const updateOrder = {
        status
    }
    const update = await Order.findByIdAndUpdate(id, updateOrder)
        .then(() => {
            res.status(200).send({status: "Order approved"})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: " Error", error:err.message});
        })
}

const updateDeliveryStatusById = async (req, res) => {
    const id = req.params.id;
    const {deliveryStatus} = req.body;
    const updateOrder = {
        deliveryStatus
    }
    const update = await Order.findByIdAndUpdate(id, updateOrder)
        .then(() => {
            res.status(200).send({deliveryStatus: "Order delivered"})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({deliveryStatus: " Error", error:err.message});
        })
}
const deleteById = async (req, res) => {
    const id = req.params.id
    await Order.findByIdAndRemove(id).exec()
    res.send('order Deleted');
}

const countOrders = (req, res) => {
    Order.count({ }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

const countApprovalStatusApproved = (req, res) => {
    Order.count({ status: "Approved" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

const countApprovalStatusNotApproved = (req, res) => {
    Order.count({ status: "Not approved" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

const countApprovalStatusNotDecided = (req, res) => {
    Order.count({ status: "Not decided" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

const countDeliveredStatusDelivered = (req, res) => {
    Order.count({ deliveryStatus: "Delivered" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

const countDeliveredStatusNotDelivered = (req, res) => {
    Order.count({ deliveryStatus: "Not delivered" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

const countDeliveredStatusPending = (req, res) => {
    Order.count({ deliveryStatus: "Pending" }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = {
    createOrder,
    getAllOrders,
    orderById,
    updateStatusById,
    updateDeliveryStatusById,
    deleteById,
    countOrders,
    countApprovalStatusApproved,
    countApprovalStatusNotApproved,
    countApprovalStatusNotDecided,
    countDeliveredStatusDelivered,
    countDeliveredStatusNotDelivered,
    countDeliveredStatusPending
}
