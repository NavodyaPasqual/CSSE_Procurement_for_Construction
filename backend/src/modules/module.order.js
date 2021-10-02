const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        orderID: {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        },
        site : [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'sites'
        }],
        item1: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'items'
        }],
        item2: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'items'
        }],
        item3: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'items'
        }],
        quantity1: {
            type: Number,
            required: false
        },
        quantity2: {
            type: Number,
            required: false
        },
        quantity3: {
            type: Number,
            required: false
        },
        supplier: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'suppliers'
        }],
        status: {
            type: String,
            default: 'Not decided'
        },
        deliveryStatus: {
            type: String,
            default: 'Not delivered'
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model('orders', OrderSchema);