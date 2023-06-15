var express = require('express');
var router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/boardList', boardController.getList);  //게시판의 게시글 목록 조회

router.get('/post/:post_code', boardController.getPost);    //게시글과 댓글 내용 조회
router.post('/post/write', boardController.setPost);    //게시글 작성
router.post('/post/update', boardController.updatePost);    //게시글 수정
router.post('/post/delete', boardController.deletePost);    //게시글 삭제

router.post('/comment/write', boardController.setComment);  //댓글 작성
router.post('/comment/update', boardController.updateComment);  //댓글 수정
router.post('/comment/delete', boardController.deleteComment);  //댓글 삭제

module.exports = router;

