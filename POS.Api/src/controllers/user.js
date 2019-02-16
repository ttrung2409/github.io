import UserService from '../services/userService'

var express = require('express');
var router = express.Router();

let userService = new UserService();

router.get('/:id', function (req, res) {
  userService.get(req.params.id).then(user => res.send(user));
});

router.post('/', function (req, res) {
  userService.save(req.body).then(user => {
    res.send(user);
  });
});

router.put('/', function (req, res) {
  userService.save(req.body).then(user => {
    res.send(user);
  });
});

router.delete('/:id', function (req, res) {
  userService.delete(req.params.id);
  res.end();
});

module.exports = router;
