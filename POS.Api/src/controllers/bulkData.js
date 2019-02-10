import BulkDataService from '../services/bulkDataService'

var express = require('express');
var router = express.Router();

let service = new BulkDataService();

router.post('/get/customers-with-income-between', function (req, res) {
  service.getCustomersWithIncomeBetween(req.body).then(customers => {
    res.send(customers);
  });
});

router.post('/get/products-with-income-between', function (req, res) {
  service.getProductsWithIncomeBetween(req.body).then(products => {
    res.send(products);
  });
});

router.delete('/products-with-income-between', function (req, res) {
  service.deleteProductsWithIncomeBetween({
    fromDate: req.query.fromDate || null,
    toDate: req.query.toDate || null,
    fromAmount: req.query.fromAmount !== undefined ? parseFloat(req.query.fromAmount) : null,
    toAmount: req.query.toAmount !== undefined ? parseFloat(req.query.toAmount) : null
  }).then(() => res.end());
});

router.delete('/customers-with-income-between', function (req, res) {
  service.deleteCustomersWithIncomeBetween({
    fromDate: req.query.fromDate || null,
    toDate: req.query.toDate || null,
    fromAmount: req.query.fromAmount !== undefined ? parseFloat(req.query.fromAmount) : null,
    toAmount: req.query.toAmount !== undefined ? parseFloat(req.query.toAmount) : null
  }).then(() => res.end());
});

module.exports = router;
