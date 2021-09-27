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
        site : {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'sites'
        },
        item: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'items'
        }],
        quantity: {
            type: Number,
            required: false
        },
        status: {
            type: String,
            default: 'Not decided'
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model('orders', OrderSchema);