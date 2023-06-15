const express = require('express');
const userModel = require('../models/userModel');
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
    let user_id = req.session.user.user_id;
    
    userModel.getStudent(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}

exports.setScore = (req, res)=>{
    let user_id = req.session.user.user_id;
    
    userModel.setScore(user_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send('Invalid credentials');
      });
}
