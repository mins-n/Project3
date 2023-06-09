var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/register.html', loginController.join);
router.post('/login.html', loginController.login);
//router.post('/forget_id.html', loginController.findId);
//router.post('/forget_password.html', loginController.findPw);

module.exports = router;

