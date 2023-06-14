var express = require('express');
var router = express.Router();
const lectureController = require('../controllers/lectureController');

router.get('/syllabus_inquiry', lectureController.getLecture);
router.get('/enrolment', lectureController.getLecture);
router.post('/enrolment', lectureController.enrolment);

module.exports = router;

