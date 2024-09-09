const productModel = require("../models/product");

module.exports.addProduct = async (req, res) => {
    let { productName, productSku, productImage, productTagline, variant, quantity, productMOQ, price, discount, productSummary, productDescription, productCode } = req.body;

    let existProduct = await productModel.findOne({ productSku: productSku });

    if (existProduct) {
        return res.status(500).send("This Sku is already exist");
    }

    let addProduct = await productModel.create({
        productName,
        productSku,
        productImage,
        productTagline,
        variant,
        quantity,
        productMOQ,
        price,
        discount,
        productSummary,
        productDescription,
        productCode
    });

    res.send("Product Created Successfully");
};

module.exports.showAllProduct = async (req, res) => {
    let allproduct = await productModel.find({});
    res.send(allproduct);
};