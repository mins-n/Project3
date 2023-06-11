const express = require('express');
const boardModel = require('../models/boardModel');

exports.getList = async (req, res, next)=>{
    
    let user_id = req.body.user_id;
    let year = req.body.year;
    let semester = req.body.semester;
    let board_name = req.body.board_name;
    let lecture_code = req.body.lecture_code;
    let page = req.body.page;

    user_id = '2018202091';
    board_name = '자료실';

    let semesterList = await boardModel.getSemester(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
    if(typeof semester === "undefined") //학기가 정해져 있지 않은경우
    {
        year = semesterList[0].year.toString(); //가장 높은 연도
        semester = semesterList[0].semester.toString(); //가장 높은 학기
    }
    let lectureList = await boardModel.getLecture(user_id, year, semester); //해당 년도, 학기에 대한 모든 강의를 가져옴
    if(typeof lecture_code === "undefined") //강의가 정해져 있지 않은경우
    {
        lecture_code = lectureList[0].lecture_code.toString(); //오름차순으로 가장 높이있는 강의선택 
    }
    let pageCount = await boardModel.getPageCount(user_id, lecture_code, board_name);//해당하는 강의에 대한 게시판의 모든 게시글에 대한 페이지수 
    pageCount = (pageCount[0].total_posts / 10 + 1).toString();
    if(typeof page === "undefined") page = '1';
    let list = await boardModel.getList(user_id, lecture_code, board_name, page);//해당 페이지에 대한 모든 게시글 가져옴

    res.status(200).send({
        semesterList: semesterList,
        lectureList: lectureList,
        list: list,
        pageCount: pageCount,
        page: page
      });
}