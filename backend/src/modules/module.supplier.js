const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const SupplierSchema = new mongoose.Schema(
    {
        supplierID: {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        },
        name: {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        },
        address : {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        },
        contactNo : {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model('suppliers', SupplierSchema);