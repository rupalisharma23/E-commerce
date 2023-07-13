const express = require("express");
const router = express.Router();const middleware = require("../middleware/authMiddleware");
const controller = require('../controllers/OrderController')
const { gerOrderController, changeStatusController,getAllOrdersController } = controller;
const { requireSignIn, AminAccress } = middleware;


router.get("/get-orders/:id", requireSignIn, gerOrderController);

router.post("/change-status/:id", requireSignIn, changeStatusController );

router.get("/get-all-orders", requireSignIn, AminAccress, getAllOrdersController);

module.exports = router