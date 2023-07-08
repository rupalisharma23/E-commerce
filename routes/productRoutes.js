const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} = product;
const middleware = require("../middleware/authMiddleware");
const { requireSignIn, AminAccress } = middleware;
const formidableMiddleware = require("express-formidable");

// to create product
router.post('/create-product',requireSignIn, AminAccress,formidableMiddleware(), createProductController )

// to get product
router.get(
  "/get-product",
  getProductController
);

// to get single product
router.get("/get-single-product/:_id", getSingleProductController);

// to get photo
router.get('/get-photo/:pid', productPhotoController)

// to update product
router.put('/update-product/:_id',requireSignIn, AminAccress,formidableMiddleware(), updateProductController )

// to delete product
router.delete("/delete-product/:_id",requireSignIn, AminAccress, deleteProductController);

module.exports = router
