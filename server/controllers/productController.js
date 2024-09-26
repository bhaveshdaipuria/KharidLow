const productModel = require("../models/product");
const path = require("path");
const fs = require("fs").promises;

module.exports.addProduct = async (req, res) => {
    try {

        const { originalname, buffer } = req.file || {};
        const { category, subCategory, item, productName, sku, subHead, summary, keyHighlights, basePrice, moq, isDiscounted, baseDiscount, taxType, taxRate } = req.body;

        // Validate required fields
        if (!sku || !productName || !category) {
            return res.status(400).json({ message: 'SKU, Product Name, and Category are required' });
        }

        // Check if the file exists in the request
        if (!originalname || !buffer) {
            return res.status(400).json({ message: 'Product image is required' });
        }

        // Check if SKU already exists
        const existProduct = await productModel.findOne({ sku });
        if (existProduct) {
            return res.status(400).json({ message: 'This SKU already exists' });
        }

        const extension = path.extname(originalname);
        const uniqueName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${extension}`;
        const filePath = path.join(__dirname, '../files', uniqueName);
        const productCode = `${sku}_${Math.floor(10000000 + Math.random() * 90000000)}`;

        // Save image file to the filesystem
        try {
            await fs.writeFile(filePath, buffer);
            console.log('File saved successfully as:', uniqueName);
        } catch (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ message: 'Failed to save the product image' });
        }

        // Create the product in MongoDB
        try {
            const addProduct = await productModel.create({
                category,
                subCategory,
                item,
                sku,
                productCode,
                productName,
                subHead,
                summary,
                keyHighlights,
                mainImage: uniqueName,
                basePrice,
                moq,
                isDiscounted,
                baseDiscount,
                taxType,
                taxRate
            });

            return res.status(200).json({ message: 'Product Created Successfully' });

        } catch (error) {
            // Clean up by removing the uploaded file if database operation fails
            await fs.unlink(filePath);
            console.error('Error creating product:', error);
            return res.status(500).json({ message: 'Failed to create product in database', error: error.message });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
    }
};


module.exports.showAllProduct = async (req, res) => {
    let allproduct = await productModel.find({}, {
        _id: 1, productName: 1, category: 1, subCategory: 1, item: 1, mainImage: 1, sku: 1, productCode: 1, baseDiscount: 1, basePrice: 1, taxType: 1, hello: 1
    });
    res.send(allproduct);
};