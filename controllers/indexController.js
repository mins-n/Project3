const express = require('express');
const indexModel = require('../models/indexModel');

// Handle the GET request for the index page
exports.getIndexPage = (req, res) => {
  // Call the corresponding function in the index model to fetch data
  const data = indexModel.getTimetable();

  // Render the index view and pass the data
  res.render('index', { data });
};