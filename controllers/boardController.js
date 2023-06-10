const express = require('express');
const boardModel = require('../models/boardModel');

exports.getList = async (req, res, next)=>{
    
    const user_id = req.body.user_id;
    const year = req.body.year;
    const semester = req.body.semester;
    const board_name = req.body.board_name;
    const lecture_code = req.body.lecture_code;
    const page = req.body.page;

    let semesterList = await boardModel.getSemester(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
    console.log(semesterList);
    if(semester == "%undefined%") //학기가 정해져 있지 않은경우
    {
        //year = ; 가장 높은 연도
        //semester = ; 가장 높은 학기
    }
    let lectureList = await boardModel.getLecture(user_id, year, semester); //해당 년도, 학기에 대한 모든 강의를 가져옴
    console.log(lectureList);
    if(lecture_code == "%undefined%") //강의가 정해져 있지 않은경우
    {
        //lecture_code = ; 오름차순으로 가장 높이있는 강의선택 
    }
    let pageCount = await boardModel.getPageCount(user_id, lecture_code, board_name);//해당하는 강의에 대한 게시판의 모든 게시글에 대한 페이지수 
    console.log(pageCount);
    let list = await boardModel.getList(user_id, lecture_code, board_name, page);//해당 페이지에 대한 모든 게시글 가져옴
    
    console.log(list)
 
    //반환값
    /*
    semesterList : 학기
    lectureList : 강의
    list : 게시글
    pageCount : 전체페이지
    page : 현제페이지
    */
    res.render('../KWAS/boards/boardList.html', {semesterList});
    
}