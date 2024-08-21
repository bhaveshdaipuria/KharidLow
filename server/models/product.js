const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    productSku: {
        type: String,
        require: true,
        unique: true 
    },
    productImages: {
        type: [String],
        require: true
    },
    productTagline: {
        type: String,
        require: true
    },
    variant: {
        type: Object,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        require: true
    },
    productSummary: {
        type: String,
        require: true
    },
    productDescription: {
        type: Object,
        require: true
    },
    productCode: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);