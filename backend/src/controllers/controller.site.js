const Site = require('../modules/module.site');
const {next} = require("lodash");

const createSite = (req, res) => {
    const {siteID,name,location} = req.body
    // validate fields
    if(!siteID || !name || !location) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    Site.create({siteID,name,location},(err,name) => {
        if(err) {
            return res.status(400).json({
                error: 'Error Found'
            });
        }
        res.json(name);
    });
}

const getAllSites = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Site.find()
        .sort([[sortBy, order]])
        .exec((err, site) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(site);
        });
}

const siteById = async (req, res) => {
    Site.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

const updateById = async(req, res) => {
    const { slug } = req.params
    const {siteID,name,location} = req.body
    Site.findOneAndUpdate({slug}, {siteID,name,location}, {new: true})
        .exec((err,site) => {
            if(err) console.log(err)
            res.json(site);
        })
};

const deleteById = async (req, res) => {
    const id  = req.params.id
    await Site.findByIdAndRemove(id).exec()
    res.send("Deleted");
};

const countSites = (req, res) => {
    Site.count({ }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = {
    createSite,
    siteById,
    getAllSites,
    updateById,
    deleteById,
    countSites
}