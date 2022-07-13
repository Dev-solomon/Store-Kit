const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

//this is the userproductmodel
const cart = Schema({
    owner:{
        type:String,
        require:true,
    },
    product: {
        type: String,
        require: true,
    },
    price: {
        type: Number,min:1,max:1000,
        require: true,
    },
    created_at: {
         type: Date, required: true, default: Date.now
         }
 })

 const cartdb = mongoose.model("cartdb", cart);
 module.exports = cartdb;