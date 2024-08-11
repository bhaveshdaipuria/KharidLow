const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String, 
        require: true
    },
    category: {
        type: String,
        require: true
    },
    prdouctPrice: {
        type: Number,
        require: true
    },
    availability: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model("Product", productSchema);