import InvoiceService from '../services/invoiceService'

var express = require('express');
var router = express.Router();

let invoiceService = new InvoiceService();

router.get('/lookup', function (req, res) {
  invoiceService.lookup(req.query.query).then(customers => {
    res.send(customers);
  });
});

router.get('/:id', function (req, res) {
  invoiceService.getFull(req.params.id).then(customer => res.send(customer));
});

router.post('/', function (req, res) {
  invoiceService.save(req.body).then(customer => {
    res.send(customer);
  });
});

router.put('/', function (req, res) {
  invoiceService.save(req.body).then(customer => {
    res.send(customer);
  });
});

router.delete('/:id', function (req, res) {
  invoiceService.delete(req.params.id);
  res.end();
});

router.post('/:id/pay', function (req, res) {
  invoiceService.pay(req.body).then(() => {
    res.end();
  });
});

module.exports = router;
