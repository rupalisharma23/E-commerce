const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController")
const middleware = require("../middleware/authMiddleware")
const { requireSignIn, AminAccress } = middleware;
const { resisterController, loginController, testController } = auth;

// Register
router.post('/register', resisterController )

// Login
router.post("/login", loginController);

// test
router.get('/test', requireSignIn , AminAccress ,testController)

module.exports = router