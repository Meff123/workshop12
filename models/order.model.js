const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    productId: {type: String},
    name: {type:String},
    quantity: {type: Number}
})

module.exports = mongoose.model('orders',orderSchema);