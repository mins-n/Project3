const express = require('express');
const userModel = require('../models/userModel');
const boardModel = require('../models/boardModel');
const moment = require('moment');

exports.getUser = (req, res)=>{
    let user_id = req.session.user.user_id;

    userModel.getUser(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.updateUser = (req, res)=>{
    let user_id = req.session.user.user_id;
    let email = req.body.email;
    let phone_num = req.body.phone_num;
    let password = req.body.password;
    let profile = req.body.profile;
    
    console.log(user_id, email, phone_num, password, profile);
    userModel.updateUser(user_id, email, phone_num, password, profile)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.getProfessor = (req, res)=>{
    let name = req.query.name;

    if(typeof name === "undefined")
        name = "";
    name = "%" + name + "%";
    userModel.getProfessor(name)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}


exports.getScore = (req, res)=>{
    let user_id = req.session.user.user_id;

    userModel.getScore(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.getScoreAvg = async (req, res, next)=>{
    let user_id = req.session.user.user_id;
    let result = [];
    let semesterList = await boardModel.getSemester(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
    
    for (let i = 0; i < semesterList.length; i++) {
        let year = semesterList[i].year.toString();
        let semester = semesterList[i].semester.toString();
        console.log(user_id, year, semester);
        let averageGrade = await userModel.getGrade(user_id, year, semester);
        console.log(averageGrade);
        result.push({ year: year, semester: semester, averageGrade: averageGrade[0].average_grade });
    }
    
    console.log(result);
    res.status(200).send(result);
}


exports.getAdviser = (req, res)=>{
    let user_id = req.session.user.user_id;
    
    userModel.getAdviser(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}


exports.getScholarship = (req, res)=>{
    let user_id = req.session.user.user_id;
    
    userModel.getScholarship(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.getLecture = (req, res)=>{
    let user_id = req.session.user.user_id;
    
    userModel.getLecture(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}


exports.getStudent = (req, res)=>{
    let lecture_code = req.params.lecture_code;

    userModel.getStudent(lecture_code)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.setScore = (req, res)=>{
    let user_id = req.body.user_id;
    let grade = req.body.grade;
    let lecture_code = req.body.lecture_code;

    console.log(user_id,lecture_code,grade);
    userModel.setScore(user_id,lecture_code,grade)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}
