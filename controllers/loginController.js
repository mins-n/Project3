const express = require('express');
const loginModel = require('../models/loginModel');

exports.join = (req, res)=>{
    var datas = [req.body.school_number, req.body.password, req.body.name, req.body.telephone,
        req.body.inputEmail,req.body.register_choice];
        loginModel.join(datas, function(stat, result){
            res.status(stat).send(result)
    });
}

exports.login = (req, res) => {
    const schoolNumber = req.body.school_number;
    const password = req.body.password;
    const registerChoice = req.body.register_choice;

    loginModel.authenticate(schoolNumber, password, registerChoice)
      .then((user) => {
        // Authentication successful
        res.status(200).send('Login successful');
      })
      .catch((error) => {
        // Authentication failed
        res.status(401).send('Invalid credentials');
      });
  };

/*
exports.findId = (req, res)=>{
    const name = req.body.;
    const phone_num = req.body. ;
        loginModel.findId(name, phone_num, function(stat, result){
            res.status(stat).send(result)
    });
}

exports.findPw = (req, res)=>{
  const user_id = req.body.;
  const name = req.body.;
  const phone_num = req.body.;
      loginModel.findPw(user_id, name, phone_num, function(stat, result){
          res.status(stat).send(result)
  });
}
*/