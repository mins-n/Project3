// Router logic for the index page

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Define the routes for the index page
router.get('/index.html', indexController.getIndexPage);

module.exports = router;
