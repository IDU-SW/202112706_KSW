const Sequelize = require('sequelize');
const conn = require('../../dbConnection');
const models = require('../../models/model') 
const typeService = require('../productType/productType.service')
const Op = Sequelize.Op;

const product = models.product;
const productType = models.productType;

exports.getAllProducts = (req, res) => {
    product.findAll()
    .then( results => {
        if(results == null) {
            res.send({
                message: 'emptyProducts'
            })
        }
        res.send(results)
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

exports.createProduct = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const carrier = req.body.carrier;
    let typeId = req.body.typeId;

    if(!name || !price) {
        res.sendStatus(400);
        return;
    }

    if(!typeId) {
        typeId = 1;
    }

    try {
        const ret = await product.create({
            name: name,
            price: price,
            carrier: carrier
        }, {logging: false});

        const result = {
            "name": name,
            "price": price,
            "carrier": carrier,
            "type_id": typeId
        }

        typeService.findById(typeId)
        .then(type => {
            if(type) {
                addToType(typeId, ret.id);
                res.sendStatus(200);
                // res.send(result);
                console.log('create succeed');
            } else {
                res.sendStatus(400);
                res.send('no such type');
            }
        })
    }
    catch (error) {
        console.log('Error: ', error);
    }
}

async function addToType(typeId, productId) {
    const _product = await product.findOne({ where: { id: productId }})
    const type = await productType.findOne({ where: { id: typeId} })
    console.log('type name', type.name)
    _product.setProductType(type)
}

exports.updateProduct = async (req, res) => {
    const id = req.params['id']

    if(!id) {
        res.send('id is required element!')
        res.sendStatus(400);
        return;
    }

    try {
        const _product = await models.product.findOne({
            where: { id: id },
            raw: true
        });

        console.log('_product: ', _product)

        const name = (req.body.name === undefined) ? _product.name : req.body.name ;
        const price = (req.body.price === undefined) ? _product.price : req.body.price;


        console.log('name: ', name)
        console.log('price: ', price)
        
        const ret = await product.update({
            name: name,
            price: price
        },{
            where: {
                id: id
            }
        });

        res.send(product);
        res.sendStatus(200);
    }
    catch(error) {
        res.end();
        return;
    }
}

exports.getProductByType = async (req, res) => {
    const typeId = req.params.id;

    product.findAll({
        where: {
            type_id: typeId
        },
        raw: true
    })
    .then( results => {
        res.send(results);
    })
    .catch( error => {
        res.send(error)
    })

}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    const _product = product.findOne({
        where: {
            id: id
        }
    })

    if(!id) {
        res.send('no id')
        res.end();
        return;
    }


    if(!_product.id) {
        res.send('no product');
        res.end();
        return;
    }

    product.destroy({
        where: { id: id },
        truncated: true
    })
    .then( () => {
        res.send('product deleted');
    })
    .catch(error => {
        res.send('operation failed');
    })
}