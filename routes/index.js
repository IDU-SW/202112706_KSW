const express = require('express');
const router = express.Router();
const product = require('./product/index');
const productType = require('./productType/index')

router.use('/product', product);
router.use('/productType', productType)

module.exports = router;
