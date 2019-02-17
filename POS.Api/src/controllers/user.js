import UserService from '../services/userService'

var express = require('express');
var router = express.Router();

let userService = new UserService();

router.get('/all', function (req, res) {
  userService.all().then(users => res.send(users));
});

router.get('/allPermissions', function (req, res) {
  userService.allPermissions().then(permissions => res.send(permissions));
});

router.get('/:id', function (req, res) {
  userService.get(req.params.id).then(user => res.send(user));
});

router.post('/', function (req, res) {
  userService.save(req.body).then(user => {
    res.send(user);
  }).catch(err => res.status(400).send(err));
});

router.delete('/:id', function (req, res) {
  userService.delete(req.params.id);
  res.end();
});

module.exports = router;
