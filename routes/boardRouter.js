var express = require('express');
var router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/boardList.html', boardController.getList);


module.exports = router;

