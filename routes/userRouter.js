var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/get', userController.getUser);
router.post('/update', userController.updateUser);
router.get('/professor', userController.getProfessor);
router.get('/score', userController.getScore);
router.get('/adviser', userController.getAdviser);
router.get('/scholarship', userController.getScholarship);
router.get('/professor/lecture', userController.getLecture);
router.get('/professor/lecture/:lecture_code', userController.getStudent);
router.post('/professor/lecture/score', userController.setScore);

module.exports = router;

