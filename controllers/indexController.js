const express = require('express');
const indexModel = require('../models/indexModel');

// Handle the GET request for the index page
exports.getIndexPage = (req, res) => {
  // Call the corresponding function in the index model to fetch data
  const data = indexModel.getTimetable();

  // Render the index view and pass the data
  res.render('index', { data });
};

exports.getUserInfo = (req, res)=>{
  let user_id = null;
  if (req.session.user) {
    user_id = req.session.user.user_id;
  } else {
    res.status(400).send("세션이 없습니다.");
    return;
  }

  indexModel.getUserInfo(user_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send('Invalid credentials');
    });
}