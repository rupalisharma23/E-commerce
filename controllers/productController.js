const product = require("../models/ProductModel");
const fs = require("fs");
const { findByIdAndUpdate } = require("../models/ProductModel");

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
      case photo.size > 1 * 1024 * 1024:
        return res.status(400).send({
          error: "photo size should be less than 1MB",
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
    const allProduct = await product
      .find({})
      .select("-photo")
      .populate("categories")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, allProduct, length: allProduct.length });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

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
      case !photo:
        return res.status(400).send({
          error: "photo is required and size should be less than 1mb",
        });
      case photo.size > 1 * 1024 * 1024:
        return res.status(400).send({
          error: "photo size should be less than 1MB",
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
    res
      .status(200)
      .send({ message: "product updated successfull", productModel });
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
};
