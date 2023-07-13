const express = require("express");
const router = express.Router();const middleware = require("../middleware/authMiddleware");
const controller = require('../controllers/OrderController')
const { gerOrderController, changeStatusController } = controller;
const { requireSignIn, AminAccress } = middleware;


router.get("/get-orders/:id", requireSignIn, gerOrderController);

router.post("/change-status/:id", requireSignIn, changeStatusController );

module.exports = router