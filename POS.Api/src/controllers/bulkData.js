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

module.exports = router;
