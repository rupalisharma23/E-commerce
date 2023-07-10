const mongoose = require('mongoose');
const {Schema} = mongoose;

const CartSchema = new Schema({
  cart: 
    {
      type: mongoose.ObjectId,
      ref: "products",
      required: true,
    },
  quantity:{
      type:Number,
      default:1,
      required:true
  },
  userInfo: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  }
},{ timestamps: true });

module.exports = mongoose.model("cartItems", CartSchema);