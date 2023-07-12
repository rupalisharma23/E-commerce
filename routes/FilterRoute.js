const express = require('express');
const router = express.Router();
const getFilterController = require("../controllers/filterController");

// to get filter 
router.get('/getFilters', getFilterController)

module.exports = router