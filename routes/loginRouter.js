var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/register', loginController.join);
router.post('/login', loginController.login);
router.get('/forget_id', loginController.findId);
router.get('/forget_password', loginController.findPw);

module.exports = router;

