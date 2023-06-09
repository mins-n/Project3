var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/register.html', loginController.join);
router.post('/login.html', loginController.login);

module.exports = router;

