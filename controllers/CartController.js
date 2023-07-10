const cartItems = require('../models/CartModel');

// to save cart items
const createCartController = async(req,res) =>{
    try{

        const { cart, userInfo, quantity } = req.body;
        if (!userInfo) {
          res.status(400).send({ error: "please login" });
        }

        const checkIfCartItemAlreadyExist = await cartItems.findOne({ cart });
        if(checkIfCartItemAlreadyExist){
            const updatedItem = await cartItems.findOneAndUpdate(
              { cart },
              {
                ...req.body,
                quantity:  checkIfCartItemAlreadyExist.quantity + (parseInt(quantity)),
              },
              { new: true }
            );
            res
              .status(200)
              .send({ message: "item added to cart", updatedItem });
        }
        else{

        const allCartItems = await cartItems.create({
          cart,
          userInfo: userInfo,
          quantity,
        });

        res.status(200).send({ message: "item added to cart", allCartItems });
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error})
    }
}

// to get cart items
const getCartController = async(req,res) =>{
    try {

        const {id} = req.params
        const allCartItems = await cartItems
          .find({ userInfo: id })
          .populate({
            path: "cart",
            select: "-photo",
            populate: { path: "categories", select: "name" },
          });
        res.status(200).send({allCartItems})

    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error });
    }
}

// to get cart items
const getCartCountController = async (req, res) => {
  try {
    const { id } = req.params;
    const allCartItems = await cartItems.find({ userInfo: id })
    res.status(200).send({ length:allCartItems.length });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

// to delete cart item

const deleteCartController = async(req,res) =>{
  try{
       const {id} = req.params
       const deletedItem = await cartItems.findByIdAndDelete(id);
       res.status(200).send({message:'item deleted'})

  }
  catch(error){
    console.log(error);
    res.status(400).send({error:error})
  }
}

module.exports = {
  createCartController,
  getCartController,
  deleteCartController,
  getCartCountController,
};