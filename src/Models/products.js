const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

    idUser:{
        type:String,
        required:true
    },
    
    nameProducts:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:false
    },

    category:{
        type:String,
        required:true
    }, 

    link:{
        type:String,

    },
    codeSKU:{
        type:String,

    },
    mark:{
        type:String,
    },

    stock:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },
    localization:{
        type:String,

    },

}, {timestamps:true} )


const Products = mongoose.model('Products', productsSchema);
module.exports = {
    Products, 
    productsSchema
}

