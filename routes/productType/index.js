const express = require('express');
const router = express.Router();
const service = require('./productType.service.js');

router.get('/list', (req, res) => {
    service.getAllTypes(req, res);
});
router.post('/', (req, res) => {
    service.createGroup(req, res);
});

module.exports = router;