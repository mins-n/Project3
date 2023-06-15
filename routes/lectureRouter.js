var express = require('express');
var router = express.Router();
const lectureController = require('../controllers/lectureController');

router.get('/syllabus_inquiry', lectureController.getLecture);
router.get('/enrolment', lectureController.getLecture2);
router.post('/enrolment', lectureController.enrolment);
router.get('/evaluation', lectureController.getEvaluatedLecture);
router.get('/user_evaluation', lectureController.getUserLecture);
//router.post('/evaluation', lectureController.evaluate);

module.exports = router;

