const order = require('../models/OrderModel');

const gerOrderController = async(req,res) =>{
    try{
        const {id} = req.params;
        const allOrders = await order
          .find({ buyer: id })
          .populate({
            path: "buyer",
            select: { password: 0, role: 0, createdAt: 0, updatedAt: 0 },
          })
          .select({
            product: {
              "cart.size": 0,
              "cart.quantity": 0,
              "cart.createdAt": 0,
              "cart.updatedAt": 0,
            },
          })
          .select("-payment")
          .sort({ createdAt: -1 });
        res.status(200).send({allOrders})
    }
    catch(error){
        console.log(error);
        res.status(500).send({error})
    }
}

const getAllOrdersController = async (req, res) => {
  try {
    const { id } = req.params;
    const allOrders = await order
      .find({})
      .populate({
        path: "buyer",
        select: { password: 0, role: 0, createdAt: 0, updatedAt: 0 },
      })
      .select({
        product: {
          "cart.size": 0,
          "cart.quantity": 0,
          "cart.createdAt": 0,
          "cart.updatedAt": 0,
        },
      })
      .select("-payment").sort({createdAt:-1})
    res.status(200).send({ allOrders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const changeStatusController = async(req,res) =>{
    try {const { id } = req.params;
    const {status, productId} = req.body
    const allOrders = await order.findOneAndUpdate(
      { _id: id, "product._id": productId },
      { $set: { "product.$.status": status } },
      { new: true }
    );
    res.status(200).send({message:'status updated'})
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
}

module.exports = { gerOrderController, changeStatusController,getAllOrdersController };