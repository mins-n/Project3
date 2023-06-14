const express = require('express');
const boardModel = require('../models/boardModel');

exports.getList = async (req, res, next)=>{
    let user_id = req.session.user.user_id;
    let year = req.query.year;
    let semester = req.query.semester;
    let board_name = req.query.board_name;
    let lecture_code = req.query.lecture_code;
    let lectureList;
    let list;

    let semesterList = await boardModel.getSemester(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
    if (typeof semesterList[0] !== "undefined")
    {
      if(typeof year === "undefined" || typeof semester === "undefined" || year === "" || semester === "") //학기가 정해져 있지 않은경우
      {
          year = semesterList[0].year.toString(); //가장 높은 연도
          semester = semesterList[0].semester.toString(); //가장 높은 학기
      }
      lectureList = await boardModel.getLecture(user_id, year, semester); //해당 년도, 학기에 대한 모든 강의를 가져옴
      if(typeof lecture_code === "undefined" || lecture_code === "") //강의가 정해져 있지 않은경우
      {
          lecture_code = lectureList[0].lecture_code.toString(); //오름차순으로 가장 높이있는 강의선택 
      }
      list = await boardModel.getList(user_id, lecture_code, board_name);//해당 페이지에 대한 모든 게시글 가져옴
    }
    let result = {
        semesterList: semesterList,
        lectureList: lectureList,
        list: list
      }
    console.log(result);
    res.status(200).send(result);
}

exports.getPost = (req, res)=>{
    let post_code = req.params.idx;
    console.log(post_code)
    boardModel.getPost(post_code)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
}