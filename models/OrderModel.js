const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  product: [
    {
      type: mongoose.ObjectId,
      ref: "products",
    },
  ],
  payment: {},
  buyer: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  status:{
    type:String,
    default:'Not processed',
    enum:['Not processed','proccessing', 'shipped', 'dilevered','canceled']
  }
},{ timestamps: true });

module.exports = mongoose.model("orders", orderSchema);
