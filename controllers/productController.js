const product = require("../models/ProductModel");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, categories, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "name is required" });
      case !description:
        return res.status(400).send({ error: "description is required" });
      case !price:
        return res.status(400).send({ error: "price is required" });
      case !quantity:
        return res.status(400).send({ error: "quantity is required" });
      case !categories:
        return res.status(400).send({ error: "categories is required" });
      case !photo:
        return res.status(400).send({
          error: "photo is required and size should be less than 1mb",
        });
      case photo.size > 100 * 1024:
        return res.status(400).send({
          error: "photo size should be greater than 100kb",
        });
    }

    const productModel = await new product({ ...req.fields });
    if (photo) {
      productModel.photo.data = fs.readFileSync(photo.path);
      productModel.photo.contentType = photo.type;
    }

    await productModel.save();
    res
      .status(200)
      .send({ message: "product create successfull", productModel });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

// to get products
const getProductController = async (req, res) => {
  try {
    const page = req.params.page;
    const productPerPage = 2;
    const allProduct = await product
      .find({})
      .skip((page - 1) * productPerPage)
      .select("-photo")
      .populate("categories")
      .limit(productPerPage)
      .sort({ createdAt: -1 });
    const allAvailableProductCount = await product.find({});
    res.status(200).send({ success: true, allProduct, length: allProduct.length, totalProduct:allAvailableProductCount.length, productPerPage });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

// get product by filter
const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const page = req.params.page;
    const productPerPage = 2;

    let filter = {}; // Initialize an empty filter object

    if (checked && checked.length > 0) {
      filter.categories = { $in: checked }; // Filter products based on the checked categories
    }

    if (radio && radio.length > 0) {
      filter.price = { $gte: radio[0], $lte: radio[1] }; // Filter products based on the price range
    }

    console.log(filter);

    const allProduct = await product
      .find(filter)
      .skip((page - 1) * productPerPage)
      .select("-photo")
      .populate("categories")
      .limit(productPerPage)
      .sort({ createdAt: -1 });
    const allAvailableProductCount = await product.find(filter);
    res.status(200).send({
      success: true,
      allProduct,
      length: allProduct.length,
      totalProduct: allAvailableProductCount.length,
      productPerPage
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

// query to find category and price 
// {
//   categories: { '$in': [ '64a95a5120986c463bc59150' ] },
//   price: { '$gte': 300, '$lte': 400 }
// }

// get single product info based on id

const getSingleProductController = async(req,res) =>{
  try{
    const _id = req.params._id;
    const singleProduct = await product
      .findOne({ _id })
      .select("-photo")
      .populate("categories");
    res.status(200).send({ success: true, singleProduct });

  }
  catch(error){
    console.log(error);
    res.status(400).send({ error: error });
  }
}

// to get photo
const productPhotoController = async(req,res) =>{
  try{
     
    const protoProduct = await product.findById(req.params.pid).select('photo')

    if(protoProduct.photo.data){
      res.set('Content-type', protoProduct.photo.contentType)
      return res.status(200).send(protoProduct.photo.data);
    }
  }
  catch(error){
    console.log(error);
    res.status(400).send({ error: error });
  }
}

// update
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, categories, shipping } =
      req.fields;
    const { photo } = req.files;
    const  _id  = req.params._id;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "name is required" });
      case !description:
        return res.status(400).send({ error: "description is required" });
      case !price:
        return res.status(400).send({ error: "price is required" });
      case !quantity:
        return res.status(400).send({ error: "quantity is required" });
      case !categories:
        return res.status(400).send({ error: "categories is required" });
      case photo && photo.size > 100 * 1024:
        return res.status(400).send({
          error: "photo size should be less than 1kb",
        });
    }

    const productModel = await product.findByIdAndUpdate(
      { _id },
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      productModel.photo.data = fs.readFileSync(photo.path);
      productModel.photo.contentType = photo.type;
    }
    await productModel.save();
    res.status(200).send({ message: "product updated successfull", productModel });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

// delete
const deleteProductController = async (req, res) => {
  try {
    const deleteProduct = await product.findByIdAndDelete(req.params._id);
     res.status(200).send({ success: true, message:'product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  filterProductController,
};
