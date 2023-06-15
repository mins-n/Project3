var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/get', userController.getUser);
router.post('/update', userController.updateUser);


module.exports = router;

