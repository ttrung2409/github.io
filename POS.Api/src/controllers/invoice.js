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
  invoiceService.getFull(req.params.id).then(invoice => res.send(invoice));
});

router.post('/', function (req, res) {
  invoiceService.save(req.body).then(invoice => {
    res.send(invoice);
  });
});

router.put('/', function (req, res) {
  invoiceService.save(req.body).then(invoice => {
    res.send(invoice);
  });
});

router.delete('/:id', function (req, res) {
  invoiceService.delete(req.params.id);
  res.end();
});

module.exports = router;
