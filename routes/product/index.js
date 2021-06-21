const express = require('express');
const router = express.Router();
const service = require('./product.service');

router.get('/list', service.getAllProducts);
router.get('/list/type/:id', (req, res) => {
    service.getProductByType(req, res)
});

router.post('/', service.createProduct);
router.post('/:id', (req, res) => {
    service.updateProduct(req, res);
})
router.delete('/:id', (req, res) => {
    service.deleteProduct(req, res);
})

module.exports = router;
