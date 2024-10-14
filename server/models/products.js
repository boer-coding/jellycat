const mongoose = require('mongoose')

let productSchema = mongoose.Schema(
    {
        id : {type: Number},
        title: {type: String},
        category: {type: String},
        des: {type: String},
        priceList:{
            small: {type: Number},
            medium: {type: Number},
            large: {type: Number}
        },
        bestseller: {type: Boolean},
        pics: {type: Object}
    }
)
// Model Name: 'Product' 
// Collection Name: 'products'
module.exports= mongoose.model("Product", productSchema);