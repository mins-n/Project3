const express = require('express');
const boardModel = require('../models/boardModel');
const moment = require('moment');

exports.getList = async (req, res, next) => {
    let user_id = null;
    if (req.session.user) {
        user_id = req.session.user.user_id;
    } else {
        res.status(400).send('세션이 없습니다.');
        return;
    }
    let year = req.query.year;
    let semester = req.query.semester;
    let board_name = req.query.board_name;
    let lecture_code = req.query.lecture_code;
    let lectureList;
    let list;
    console.log(year, semester, board_name, lecture_code);
    let semesterList = await boardModel.getSemester(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
    if (typeof semesterList[0] !== 'undefined') {
        if (typeof year === 'undefined' || typeof semester === 'undefined' || year === '' || semester === '') {
            //학기가 정해져 있지 않은경우
            year = semesterList[0].year.toString(); //가장 높은 연도
            semester = semesterList[0].semester.toString(); //가장 높은 학기
        }
        lectureList = await boardModel.getLecture(user_id, year, semester); //해당 년도, 학기에 대한 모든 강의를 가져옴
        if (typeof lecture_code === 'undefined' || lecture_code === '') {
            //강의가 정해져 있지 않은경우
            lecture_code = lectureList[0].lecture_code.toString(); //오름차순으로 가장 높이있는 강의선택
        }
        console.log(lecture_code);
        list = await boardModel.getList(lecture_code, board_name); //해당 페이지에 대한 모든 게시글 가져옴
    }
    let result = {
        semesterList: semesterList,
        lectureList: lectureList,
        list: list,
    };
    console.log(result);
    res.status(200).send(result);
};

exports.getProfessorList = async (req, res, next) => {
    let user_id = null;
    if (req.session.user) {
        user_id = req.session.user.user_id;
    } else {
        res.status(400).send('세션이 없습니다.');
        return;
    }
    let year = req.query.year;
    let semester = req.query.semester;
    let board_name = req.query.board_name;
    let lecture_code = req.query.lecture_code;
    let lectureList;
    let list;
    console.log(year, semester, board_name, lecture_code);
    let semesterList = await boardModel.getSemester2(user_id); //유저가 듣는 강의에 해당하는 년도, 학기를 내림차순으로 불러옴
    if (typeof semesterList[0] !== 'undefined') {
        if (typeof year === 'undefined' || typeof semester === 'undefined' || year === '' || semester === '') {
            //학기가 정해져 있지 않은경우
            year = semesterList[0].year.toString(); //가장 높은 연도
            semester = semesterList[0].semester.toString(); //가장 높은 학기
        }
        lectureList = await boardModel.getLecture2(user_id, year, semester); //해당 년도, 학기에 대한 모든 강의를 가져옴
        if (typeof lecture_code === 'undefined' || lecture_code === '') {
            //강의가 정해져 있지 않은경우
            lecture_code = lectureList[0].lecture_code.toString(); //오름차순으로 가장 높이있는 강의선택
        }
        console.log(lecture_code);
        list = await boardModel.getList(lecture_code, board_name); //해당 페이지에 대한 모든 게시글 가져옴
    }
    let result = {
        semesterList: semesterList,
        lectureList: lectureList,
        list: list,
    };
    console.log(result);
    res.status(200).send(result);
};

exports.community = (req, res) => {
    boardModel
        .getCommunity()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.getPost = (req, res) => {
    let post_code = req.params.post_code;

    boardModel
        .getPost(post_code)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.getPost = async (req, res, next) => {
    let post_code = req.params.post_code;

    let post = await boardModel.getPost(post_code);
    let comment = await boardModel.getComment(post_code);

    let result = {
        post: post,
        comment: comment,
    };
    console.log(result);
    res.status(200).send(result);
};

exports.setPost = async (req, res) => {
    let user_id = null;
    if (req.session.user) {
        user_id = req.session.user.user_id;
    } else {
        res.status(400).send('세션이 없습니다.');
        return;
    }
    let board_name = req.body.board_name;
    let lecture_code = req.body.lecture_code;
    let title = req.body.title;
    let post_contents = req.body.post_contents;
    let file = req.body.file;

    if (typeof file === 'undefined') {
        file = null;
    }
    let post_date = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(user_id, board_name, lecture_code, post_date, title, post_contents, file);

    let board_code = await boardModel.getBoard(lecture_code, board_name);
    if (!board_code[0]) {
        await boardModel.setBoard(lecture_code, board_name);
        board_code = await boardModel.getBoard(lecture_code, board_name);
    }
    console.log(user_id, board_code[0].board_code, post_date, title, post_contents, file);
    boardModel
        .setPost(user_id, board_code[0].board_code, post_date, title, post_contents, file)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.updatePost = (req, res) => {
    let post_code = req.body.post_code;
    let title = req.body.title;
    let post_contents = req.body.post_contents;
    let file = req.body.file;
    let post_date = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(post_code, post_date, title, post_contents, file);

    boardModel
        .updatePost(post_code, post_date, title, post_contents, file)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.deletePost = (req, res) => {
    let post_code = req.body.post_code;
    console.log(post_code);

    boardModel
        .deletePost(post_code)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.setComment = (req, res) => {
    let user_id = null;
    if (req.session.user) {
        user_id = req.session.user.user_id;
    } else {
        res.status(400).send('세션이 없습니다.');
        return;
    }
    let post_code = req.body.board_code;
    let comment_contents = req.body.post_contents;
    let comment_date = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(user_id, post_code, comment_contents, comment_date);

    boardModel
        .setComment(user_id, post_code, comment_contents, comment_date)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.updateComment = (req, res) => {
    let comment_code = req.body.comment_code;
    let comment_contents = req.body.comment_contents;
    let comment_date = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(comment_code, comment_contents, comment_date);

    boardModel
        .updateComment(comment_code, comment_contents, comment_date)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};

exports.deleteComment = (req, res) => {
    let comment_code = req.body.comment_code;
    console.log(comment_code);

    boardModel
        .deleteComment(comment_code)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send('Invalid credentials');
        });
};
