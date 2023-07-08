const category = require('../models/categoryModel');

const createCategoryController = async(req,res)=>{
    const {name} = req.body
    try{
         if(!req.body.name){
            return res.status(400).send({error:'name required'})
         }
         const categories = await category.findOne({name});
         if (categories) {
           return res.status(400).send({ error: "category already exist" });
         }
         const newCategories = await category.create({name:req.body.name})
         res.status(200).send({ success: true, newCategories, message:'category added succesfully' });
    }
    catch(error){
      res.status(400).send({error:error})
    }
}

const readCategoryController = async(req,res)=>{
    try{
         const categories = await category.find({});
         res.status(200).send({ categories });
    }
    catch(error){
        res.status(400).send({error:error})
    }
}

const updateController = async(req,res) =>{
    try{
          const id = req.params.id
          const {name} = req.body
          const categories = await category.findOne({ name });
          if (categories) {
            return res.status(400).send({ error: "category already exist" });
          }
          const updateedCategory = await category.findByIdAndUpdate({_id:id},{name},{new:true}) 
          res.status(200).send({
            success:true,
            updateedCategory,
            message:'category updated'
        })
    }
    catch(error){
        res.status(400).send({error:error})
    }
}

const deleteCategoryController = async(req,res)=>{
    try {
        const _id = req.params.id
        const deleteCategory = await category.findByIdAndDelete(
          { _id },
          { new: true }
        );
        res.status(200).send({
          success: true,
          deleteCategory,
          message: "category deleted",
        });
    } catch (error) {
        console.log(error);
      res.status(400).send({ error: error });
    }
}

module.exports = {
  createCategoryController,
  readCategoryController,
  updateController,
  deleteCategoryController,
};