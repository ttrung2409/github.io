import BulkDataService from '../services/bulkDataService'

var express = require('express');
var router = express.Router();

let service = new BulkDataService();

router.post('/customer/get-with-income-between', function (req, res) {
  service.getCustomersWithIncomeBetween(req.body).then(customers => {
    res.send(customers);
  });
});

router.post('/product/get-with-income-between', function (req, res) {
  service.getProductsWithIncomeBetween(req.body).then(products => {
    res.send(products);
  });
});

router.post('/product/delete', function (req, res) {
  service.deleteProducts(req.body.ids.split(',')).then(() => res.end());
});

router.post('/customer/delete', function (req, res) {
  service.deleteCustomers(req.body.ids.split(',')).then(() => res.end());
});

module.exports = router;
