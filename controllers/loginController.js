const express = require('express');
const loginModel = require('../models/loginModel');

exports.join = (req, res)=>{
    console.log(req.body);
    var datas = [req.body.school_number, req.body.password, req.body.name, req.body.telephone,
        req.body.inputEmail,req.body.register_choice];
        loginModel.join(datas, function(stat, result){
            res.status(stat).send(result)
    });
}

exports.login = (req, res) => {
    console.log(req.body);
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