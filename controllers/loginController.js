const express = require('express');
const loginModel = require('../models/loginModel');

exports.join = (req, res)=>{
  console.log(req);
    var datas = [req.body.school_number, req.body.password, req.body.name, req.body.telephone,
        req.body.inputEmail,req.body.register_choice];
    console.log(datas);
    loginModel.join(datas)
      .then((result) => {
        res.status(200).send('회원가입 성공');
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('회원가입 실패');
      });
    }

exports.login = (req, res) => {
    const schoolNumber = req.body.school_number;
    const password = req.body.password;
    const registerChoice = req.body.register_choice;

    loginModel.authenticate(schoolNumber, password, registerChoice)
      .then((result) => {
        
        // session
        req.session.user = {
          user_id: schoolNumber,
          user_class: registerChoice,
          name: result.name
        };
        console.log(req.session.user)
        // Authentication successful
        res.status(200).send('Login successful');
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
  };

exports.findId = (req, res)=>{
    const name = req.query.name;
    const phone_num = req.query.telephone;
    console.log(name, phone_num)
    loginModel.findId(name, phone_num)
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
}
exports.findPw = (req, res)=>{
    const user_id = req.query.school_number;
    const name = req.query.name;
    const phone_num = req.query.telephone;
    loginModel.findPw(user_id, name, phone_num)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
}
