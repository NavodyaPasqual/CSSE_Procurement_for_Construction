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

const deleteById = async (req, res) => {
    const id = req.params.id
    await Order.findByIdAndRemove(id).exec()
    res.send('order Deleted');
}

module.exports = {
    createOrder,
    getAllOrders,
    orderById,
    updateStatusById,
    deleteById
}
