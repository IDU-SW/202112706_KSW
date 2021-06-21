const Sequelize = require('sequelize');
const conn = require('../../dbConnection');
const models = require('../../models/model') 
const Op = Sequelize.Op;

const product = models.product;
const productType = models.productType;

exports.findById = async (id) => {
    const type = await productType.findOne({
        where: { id: id },
        raw: true
    });
    return type
};

exports.createType = async (req, res) => {
    const name = req.body.name;
    
    if(!name) {
        res.sendStatus(400);
        return;
    }

    try {
        const ret = await productType.create({
            name: name
        }, { logging: false });

        res.sendStatus(200);
        res.send('success');
    } catch (error) {
        res.send(error)
    }
}

exports.getAllTypes = (req, res) => {
    productType.findAll()
    .then(results => {
        if (results == null) {
            res.send('empty');
            return;
        }

        res.send(results);
    })
    .catch(error => {
        res.send('Error: ', error)
    })
}