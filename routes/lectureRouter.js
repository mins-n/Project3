var express = require('express');
var router = express.Router();
const lectureController = require('../controllers/lectureController');

router.get('/syllabus_inquiry', lectureController.getLecture);  //강의목록 조회
router.get('/plan', lectureController.getPlan);
router.get('/enrolment', lectureController.getLectureSeat);    //수강신청 목록 조회
router.post('/enrolment', lectureController.enrolment); //수강 신청
router.post('/delete', lectureController.deleteEnrolment); //수강 삭제
router.get('/list', lectureController.enrolmentList) //수강 신청 현황
router.get('/evaluation', lectureController.getEvaluatedLecture);   //강의 평가목록 조회
router.get('/user_evaluation', lectureController.getUserLecture);   //로그인한 유저의 강의 평가목록 조회
router.post('/evaluation', lectureController.evaluate); //강의 평가
router.get('/schedule', lectureController.schedule); //시간표

module.exports = router;

