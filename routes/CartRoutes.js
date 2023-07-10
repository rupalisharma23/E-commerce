const express = require("express");
const router = express.Router();
const controller = require('../controllers/CartController');
const {
  createCartController,
  getCartController,
  deleteCartController,
  getCartCountController,
} = controller;

// to save cart Items
router.post('/create-cart', createCartController )

// to get cart items
router.get("/get-cart/:id", getCartController);

// to get cart items
router.get("/get-cart-count/:id", getCartCountController);

// to delete cart items
router.delete("/delete-cart/:id", deleteCartController);

module.exports = router