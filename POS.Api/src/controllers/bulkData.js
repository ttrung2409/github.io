import BulkDataService from '../services/bulkDataService'

var express = require('express');
var router = express.Router();

let service = new BulkDataService();

router.get('/get/customers-with-income-between', function (req, res) {
  service.getCustomersWithIncomeBetween(req.query.from, req.query.to).then(customers => {
    res.send(customers);
  });
});

router.get('/get/products-with-income-between', function (req, res) {
  service.getCustomersWithIncomeBetween(req.query.from, req.query.to).then(products => {
    res.send(products);
  });
});

module.exports = router;
