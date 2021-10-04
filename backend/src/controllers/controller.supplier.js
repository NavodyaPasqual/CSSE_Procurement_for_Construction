const Supplier = require('../modules/module.supplier');
const {next} = require("lodash");

const createSupplier = (req, res) => {
    const {supplierID,name,address,contactNo} = req.body
    // validate fields
    if(!supplierID || !name || !address || !contactNo) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    Supplier.create({supplierID,name,address,contactNo},(err,name) => {
        if(err) {
            return res.status(400).json({
                error: 'Error Found'
            });
        }
        res.json(name);
    });
}

const getAllSuppliers = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Supplier.find()
        .sort([[sortBy, order]])
        .exec((err, supplier) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(supplier);
        });
}

const siteById = async (req, res) => {
    Supplier.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

const updateById = async(req, res) => {
    const { slug } = req.params
    const {supplierID,name,address,contactNo} = req.body
    Supplier.findOneAndUpdate({slug}, {supplierID,name,address,contactNo}, {new: true})
        .exec((err,supplier) => {
            if(err) console.log(err)
            res.json(supplier);
        })
};

const deleteById = async (req, res) => {
    const id  = req.params.id
    await Supplier.findByIdAndRemove(id).exec()
    res.send("Deleted");
};

const countSuppliers = (req, res) => {
    Supplier.count({ }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = {
    createSupplier,
    siteById,
    getAllSuppliers,
    updateById,
    deleteById,
    countSuppliers
}