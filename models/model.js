const conn = require('../dbConnection');
const Sequelize = require('sequelize');

const ProductType = conn.define('productType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {timestamps: false});

const Product = conn.define('product', {
    //property 정의
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
    name: Sequelize.STRING,
    price: Sequelize.STRING,
}, {timestamps: true});

async function initType() {
    try {
        const groups = await ProductType.findAll({});
    
        if (groups.length === 0) {
            ProductType.create({
                name: 'default'
            })
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

async function setRelation() {
    Product.belongsTo(ProductType, { foreignKey: 'type_id' })

    try {
        await ProductType.sync().then( ret => {
            console.log('Sync Success :', ret);
            // conn.close();
        }).catch(error => {
            console.error('Sync Failure :', error);
        })

        await Product.sync().then( ret => {
            console.log('Sync Success :', ret);
            // conn.close();
        }).catch(error => {
            console.error('Sync Failure :', error);
        })
    } catch (error) {
        console.log('error: ', error)
    }

    initType()
}

setRelation()

exports.product = Product;
exports.productType = ProductType;