const express = require('express');
const userModel = require('../models/userModel');
const moment = require('moment');

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