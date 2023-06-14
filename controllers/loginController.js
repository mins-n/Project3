const express = require('express');
const loginModel = require('../models/loginModel');

exports.join = (req, res)=>{
    var datas = [req.body.school_number, req.body.password, req.body.name, req.body.telephone,
        req.body.inputEmail,req.body.register_choice];
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
    console.log(req.body);
    const schoolNumber = req.body.school_number;
    const password = req.body.password;
    const registerChoice = req.body.register_choice;

    loginModel.authenticate(schoolNumber, password, registerChoice)
      .then((result) => {
        
        // session
        req.session.user = {
          user_id: schoolNumber,
          user_class: registerChoice,
          name : result.name
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
    const name = req.body.inputName;
    const phone_num = req.body.inputPhone;
    loginModel.findId(name, phone_num)
      .then((result) => {
        res.status(200).send('Find successful');
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
    }
exports.findPw = (req, res)=>{
  const user_id = req.body.inputName;
    const name = req.body.inputName;
    const phone_num = req.body.inputPhone;
    loginModel.findPw(user_id, name, phone_num)
      .then((result) => {
        res.status(200).send('Find successful');
      })
      .catch((error) => {
        // Authentication failed
        res.status(400).send('Invalid credentials');
      });
}
