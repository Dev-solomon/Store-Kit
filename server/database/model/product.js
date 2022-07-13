const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

//this is the userproductmodel
const userpro = Schema({
    owner:{
        type:String,
        require:true,
    },
    product: {
        type: String,
        require: true,
    },
     description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,min:1,max:1000,
        require: true,
    },
    img: {
        data: Buffer,
        contentType: String,
      },
      created_at: { type: Date, required: true, default: Date.now }
 })

 const userprodb = mongoose.model("Userpro", userpro);
 module.exports = userprodb;