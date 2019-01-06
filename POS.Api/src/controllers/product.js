import ProductService from '../services/productService'

var express = require('express');
var router = express.Router();

let productService = new ProductService();

router.get('/', function (req, res) {
  
});

router.get('/:id', function (req, res) {
  productService.get(req.params.id).then(product => {
    if (!product) {
      res.status(404);
      res.send('Product not found');
    }
    else {
      res.send(product);
    }
  });
});

router.post('/search', function (req, res) {
  productService.search(req.body).then(result => {
    res.send({ total: result.count, items: result.rows });
  });
});

router.post('/', function (req, res) {
  productService.save(req.body).then(product => {
    res.send(product);
  });  
});

router.put('/', function (req, res) {
  productService.save(req.body).then(product => {
    res.send(product);
  });
});

module.exports = router;
