const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  product: [],
  payment: {},
  buyer: {
    type: mongoose.ObjectId,
    ref: "users",
  }
},{ timestamps: true });

module.exports = mongoose.model("orders", orderSchema);
