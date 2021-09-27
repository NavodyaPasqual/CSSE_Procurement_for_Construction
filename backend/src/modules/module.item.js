const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ItemSchema = new mongoose.Schema(
    {
        itemID: {
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
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model('items', ItemSchema);