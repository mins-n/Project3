var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/get', userController.getUser); //로그인한 사용자 정보
router.post('/update', userController.updateUser);  //로그인한 사용자 정보 수정
router.get('/professor', userController.getProfessor); //교수 정보 조회
router.get('/score', userController.getScore);  //학점 조회
router.get('/scoreAvg', userController.getScoreAvg);  //학점 조회
router.get('/adviser', userController.getAdviser);  //지도교수조회
router.get('/scholarship', userController.getScholarship);  //장학금 조회
router.get('/professor/lecture', userController.getLecture);    //교수가 강의하는 강의 조회
router.get('/professor/lecture/:lecture_code', userController.getStudent);  //교수가 강의하는 강의를 듣는 수강생 조회
router.post('/professor/lecture/score', userController.setScore); //학생 학점 입력

module.exports = router;

