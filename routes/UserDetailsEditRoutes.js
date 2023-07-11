const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const { requireSignIn, AminAccress } = middleware;
const userController = require('../controllers/userController')

// to edit info
router.put("/edit-user/:id", requireSignIn, userController);

module.exports = router