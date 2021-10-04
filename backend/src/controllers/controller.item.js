const Item = require('../modules/module.item');
const {next} = require("lodash");

const createItem = (req, res) => {
    const {itemID,name} = req.body
    // validate fields
    if(!itemID || !name) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    Item.create({itemID,name},(err,name) => {
        if(err) {
            return res.status(400).json({
                error: 'Error Found'
            });
        }
        res.json(name);
    });
}

const getAllItems = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Item.find()
        .sort([[sortBy, order]])
        .exec((err, item) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(item);
        });
}

const itemById = async (req, res) => {
    Item.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

const updateById = async(req, res) => {
    const { slug } = req.params
    const {itemID,name} = req.body
    Item.findOneAndUpdate({slug}, {itemID,name}, {new: true})
        .exec((err,topic) => {
            if(err) console.log(err)
            res.json(topic);
        })
};

const deleteById = async (req, res) => {
    const id  = req.params.id
    await Item.findByIdAndRemove(id).exec()
    res.send("Deleted");
};

const countItems = (req, res) => {
    Item.count({ }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = {
    createItem,
    itemById,
    getAllItems,
    updateById,
    deleteById,
    countItems
}