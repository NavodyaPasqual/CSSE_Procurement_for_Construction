const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const SiteSchema = new mongoose.Schema(
    {
        siteID: {
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
        location : {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model('sites', SiteSchema);