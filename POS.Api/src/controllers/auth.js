import UserService from '../services/authService'
import AuthService from '../services/authService';

var express = require('express');
var router = express.Router();

let authService = new AuthService();

router.post('/', function (req, res) {
  if (!!req.body.token) {
    authService.authenticateByToken(req.body.token).then(result => res.send(result));
  }
  else {
    authService.authenticate(req.body).then(result => res.send(result));
  }
});


module.exports = router;
