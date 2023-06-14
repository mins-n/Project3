const express = require('express');
const lectureModel = require('../models/lectureModel');

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
  let department = req.query.professor_name;

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

