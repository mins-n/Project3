const express = require('express');
const lectureModel = require('../models/lectureModel');

exports.getLecture = (req, res)=>{
    let year = req.query.year;
    let semester = req.query.semester;
    let lecture_name = req.query.lecture_name;
    let professor_name = req.query.professor_name;
    if(typeof lecture_name === "undefined") //학기가 정해져 있지 않은경우
      lecture_name = "";
    if(typeof professor_name === "undefined") //학기가 정해져 있지 않은경우
      professor_name = "";
    lecture_name = "%" + lecture_name + "%";
    professor_name = "%" + professor_name + "%";

    year = '2023';
    semester = '1';

    lectureModel.getLecture(year, semester, lecture_name, professor_name)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
}

exports.enrolment = (req, res)=>{
  //let lecture_name = req.query.lecture_name;
  let lecture_name = req.query.lecture_name;
  if(typeof lecture_name === "undefined") //학기가 정해져 있지 않은경우
    lecture_name = "";
  if(typeof professor_name === "undefined") //학기가 정해져 있지 않은경우
    professor_name = "";
  lecture_name = "%" + lecture_name + "%";
  professor_name = "%" + professor_name + "%";

  year = '2023';
  semester = '1';
  console.log(lecture_name);
  console.log(professor_name);
  lectureModel.getLecture(year, semester, lecture_name, professor_name)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      // Authentication failed
      res.status(400).send('Invalid credentials');
    });
}