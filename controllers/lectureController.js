const express = require('express');
const lectureModel = require('../models/lectureModel');
const boardModel = require('../models/boardModel');
const moment = require('moment');

exports.getLecture = (req, res)=>{
    let year = req.query.year;
    let semester = req.query.semester;
    let lecture_name = req.query.lecture_name;
    let professor_name = req.query.professor_name;
    if(typeof year === "undefined")
      year = "2023";
    if(typeof semester === "undefined") 
      semester = "1";
    if(typeof lecture_name === "undefined")
      lecture_name = "";
    if(typeof professor_name === "undefined") 
      professor_name = "";
    lecture_name = "%" + lecture_name + "%";
    professor_name = "%" + professor_name + "%";

    lectureModel.getLecture(year, semester, lecture_name, professor_name)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.getLecture2 = (req, res)=>{
  let lecture_name = req.query.lecture_name;
  let department = req.query.department;
  
  if(typeof lecture_name === "undefined")
    lecture_name = "";
  if(typeof department === "undefined") 
    department = "";
  lecture_name = "%" + lecture_name + "%";
  department = "%" + department + "%";

  lectureModel.getLecture2(department, lecture_name)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}

exports.enrolment = (req, res)=>{
  let user_id = req.session.user.user_id;
  let lecture_code = req.body.lecture_code;

  lectureModel.enrolment(user_id, lecture_code)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}

exports.deleteEnrolment = (req, res)=>{
  let user_id = req.session.user.user_id;
  let lecture_code = req.body.lecture_code;

  lectureModel.deleteEnrolment(user_id, lecture_code)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}

exports.enrolmentList = (req, res)=>{
  let user_id = req.session.user.user_id;

  lectureModel.enrolmentList(user_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}

exports.getEvaluatedLecture = (req, res)=>{
  let lecture_name = req.query.lecture_name;
  let name = req.query.name;

  if(typeof lecture_name === "undefined")
    lecture_name = "";
  if(typeof name === "undefined") 
    name = "";
  lecture_name = "%" + lecture_name + "%";
  name = "%" + name + "%";
  
  lectureModel.getEvaluatedLecture(name, lecture_name)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}

exports.getUserLecture = (req, res)=>{
  let user_id = req.session.user.user_id;
  
  lectureModel.getUserLecture(user_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}

exports.evaluate = (req, res)=>{
  let user_id = req.session.user.user_id;
  let lecture_code = req.body.lecture_code;
  let evaluation = req.body.evaluation;
  let evaluation_score = req.body.evaluation_score;

  console.log(user_id, lecture_code, evaluation, evaluation_score)

  lectureModel.evaluate(user_id, lecture_code, evaluation, evaluation_score)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}


exports.schedule = async (req, res, next)=>{
  let user_id = req.session.user.user_id;
  let year = req.query.year;
  let semester = req.query.semester;

  let semesterList = await boardModel.getSemester(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
  if (typeof semesterList[0] !== "undefined")
  {
    if(typeof year === "undefined" || typeof semester === "undefined" || year === "" || semester === "") //학기가 정해져 있지 않은경우
    {
        year = semesterList[0].year.toString(); //가장 높은 연도
        semester = semesterList[0].semester.toString(); //가장 높은 학기
    }
    lectureList = await boardModel.getLecture(user_id, year, semester); //해당 년도, 학기에 대한 모든 강의를 가져옴
  }
  let result = {
      semesterList: semesterList,
      lectureList: lectureList
    }
  console.log(result);
  res.status(200).send(result);
}
