const express = require("express");
const router = express.Router();
const categories = require("../controllers/categoryController");
const middleware = require("../middleware/authMiddleware");
const { route } = require("./authRoute");
const { requireSignIn, AminAccress } = middleware;
const {
  createCategoryController,
  readCategoryController,
  updateController,
  deleteCategoryController,
} = categories;

// to create categories
router.post(
  "/create-category",
  requireSignIn,
  AminAccress,
  createCategoryController
);

// to get all categories
router.get("/categories", readCategoryController);

// to update category
router.put("/categories/:id", requireSignIn, AminAccress, updateController);

// to delete
router.delete(
  "/categories/:id",
  requireSignIn,
  AminAccress,
  deleteCategoryController
);

module.exports = router;
