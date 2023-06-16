var express = require('express');
var router = express.Router();
const boardController = require('../controllers/boardController');
const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/file/");
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext)+ '-' + Date.now() + ext);
    }
})
var upload = multer({ storage: storage});

router.get('/boardList', boardController.getList);  //게시판의 게시글 목록 조회
router.get('/boardList/professor', boardController.getProfessorList);  //게시판의 게시글 목록 조회
router.get('/community',boardController.community); //커뮤니티 게시판

router.get('/post/:post_code', boardController.getPost);    //게시글과 댓글 내용 조회
router.post('/post/write', upload.single('file'), boardController.setPost);    //게시글 작성
router.post('/post/update', upload.single('file'), boardController.updatePost);    //게시글 수정
router.post('/post/delete', boardController.deletePost);    //게시글 삭제

router.post('/comment/write', boardController.setComment);  //댓글 작성
router.post('/comment/update', boardController.updateComment);  //댓글 수정
router.post('/comment/delete', boardController.deleteComment);  //댓글 삭제

module.exports = router;

