import UserService from '../services/authService'
import AuthService from '../services/authService';

var express = require('express');
var router = express.Router();

let authService = new AuthService();

router.get('/', function (req, res) {
  authService.authorise(req.query.token).then(user => res.send(user));
});

router.post('/', function (req, res) {
  authService.authenticate(req.body).then(result => res.send(result));
});


module.exports = router;
