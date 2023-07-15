const product = require("../models/ProductModel");
const category = require("../models/categoryModel");

const getFilterController  = async(req,res) =>{
    try{
     const availableProduct = await product.find({ size: { $exists: true } }).select('size')
     let temp = [];
     availableProduct.forEach((p)=>{
        temp.push(Object.values(p.size));
     })
     const combinedArray = temp.flat().filter((value, index, self) => {
       return self.indexOf(value) === index;
     }).sort()
     const categories = await category.find({});
     res.send({ size:combinedArray, categories });
    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error})
    }

}

module.exports = getFilterController; 