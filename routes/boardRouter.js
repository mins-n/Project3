var express = require('express');
var router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/boardList', boardController.getList);
router.get('/post/:post_code', boardController.getPost);
router.post('/post/write', boardController.setPost);
router.get('/post/update', boardController.updatePost);
/*
router.post('/post/update', boardController.updatePost);
router.post('/post/delete', boardController.deletePost);
router.post('/comment/write', boardController.setComment);
router.post('/comment/update', boardController.updateComment);
router.post('/comment/delete', boardController.deleteComment);
*/

module.exports = router;

