// Router logic for the index page

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Define the routes for the index page
router.post('/index.html', indexController.getIndexPage);
router.get('/header', indexController.getUserInfo);

module.exports = router;
