var express = require('express');
var router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/boardList', boardController.getList);
router.get('/post/:idx', boardController.getPost);

module.exports = router;

