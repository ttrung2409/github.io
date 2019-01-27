import CustomerService from '../services/customerService'

var express = require('express');
var router = express.Router();

let customerService = new CustomerService();

router.get('/lookup', function (req, res) {
  customerService.lookup(req.query.query).then(customers => {
    res.send(customers);
  });
});

router.get('/allTypes', function (req, res) {
  customerService.allTypes().then(types => res.send(types));
});

router.get('/:id', function (req, res) {
  customerService.get(req.params.id).then(customer => res.send(customer));
});

router.post('/', function (req, res) {
  customerService.save(req.body).then(customer => {
    res.send(customer);
  });
});

router.post('/search', function (req, res) {
  customerService.search(req.body).then(result => {
    res.send({ total: result.count, items: result.rows });
  });
});

router.put('/', function (req, res) {
  customerService.save(req.body).then(customer => {
    res.send(customer);
  });
});

router.delete('/:id', function (req, res) {
  customerService.delete(req.params.id);
  res.end();
});

module.exports = router;
