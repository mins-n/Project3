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