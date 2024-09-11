const productModel = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// module.exports.addProduct = async (req, res) => {
//     const isfileUploaded = false;
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, path.join(__dirname, '../files'));  // Save files to the directory
//         },
//         filename: function (req, file, cb) {
//             // Extract the original file extension
//             const ext = path.extname(file.originalname);

//             // Save the file with a unique name and retain the original extension
//             cb(null, file.fieldname + '-' + Date.now() + ext);
//         }
//     });

//     // File filter to allow only PNG and JSON files
//     const fileFilter = (req, file, cb) => {
//         const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
//         if (allowedTypes.includes(file.mimetype)) {
//             cb(null, true); // Accept the file
//         } else {
//             cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed.'), false); // Reject the file
//         }
//     };

//     const upload = multer({
//         storage: storage,
//         fileFilter: fileFilter,
//         limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
//     });

//     upload.array("files", 10)(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             // Multer-specific errors
//             return res.status(400).json({ error: `Multer error: ${err.message}` });
//         } else if (err) {
//             // General errors (e.g., file type error)
//             return res.status(400).json({ error: `Error: ${err.message}` });
//         }

//         // No error
//         if (!req.files || req.files.length === 0) {
//             // return res.status(400).json({ error: 'No files uploaded' });
//             console.log("No files uploaded");
//         } else {
//             console.log(req.files);
//             console.log("Files uploaded successfully");
//         }
//     });

//     console.log("Body", req.body);
//     let { productName, productSku, productImage, productTagline, variant, quantity, productMOQ, price, discount, productSummary, productDescription, productCode } = req.body;

//     console.log("SKU", productSku);
//     let existProduct = await productModel.findOne({ productSku: productSku });

//     console.log("Exist Product", existProduct);
//     if (existProduct) {
//         return res.status(500).send("This Sku is already exist");
//     }

//     let addProduct = await productModel.create({
//         productName,
//         productSku,
//         productImage,
//         productTagline,
//         variant,
//         quantity,
//         productMOQ,
//         price,
//         discount,
//         productSummary,
//         productDescription,
//         productCode
//     });

//     res.send("Product Created Successfully");
// };

module.exports.addProduct = async (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../files'));  // Save files to the directory
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + Date.now() + ext);
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed.'), false);
        }
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
    });

    upload.array("files", 10)(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: `Error: ${err.message}` });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        try {
            const { category, subCategory, item, productName, subHead, summary, keyHighlights, mainImage, productImages, basePrice, moq, isDiscounted, baseDiscount, isQtyBasedPricing, qtyPriceSlabs, isSizeVariable, sizeVariations, isColorVariable, colorVariations, taxType } = req.body;

            if (!productSku) {
                throw new Error('Product SKU is required');
            }

            const existProduct = await productModel.findOne({ productSku: productSku });
            if (existProduct) {
                throw new Error('This SKU already exists');
            }

            // Create product in MongoDB
            const addProduct = await productModel.create({
                category,               // New field
                subCategory,            // New field
                item,                   // New field
                productName,            // Updated field
                subHead,                // New field
                summary,                // New field
                keyHighlights,          // New field: Array of key-value pairs
                mainImage,              // New field
                productImages,          // Updated field (now an array of images)
                basePrice,              // New field (replaces price)
                moq,                    // Updated field (replaces productMOQ)
                isDiscounted,           // New field
                baseDiscount,           // Updated field (conditionally required)
                isQtyBasedPricing,      // New field
                qtyPriceSlabs,          // New field: Array (conditionally required based on `isQtyBasedPricing`)
                isSizeVariable,         // New field
                sizeVariations,         // New field: Array (conditionally required based on `isSizeVariable`)
                isColorVariable,        // New field
                colorVariations,        // New field: Array (conditionally required based on `isColorVariable`)
                taxType                 // New field
            });

            res.send("Product Created Successfully");
        } catch (error) {
            // If any error occurs, remove the uploaded files
            req.files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.log(`Failed to delete file: ${file.path}`);
                });
            });
            return res.status(500).json({ error: `Failed to create product: ${error.message}` });
        }
    });
};


module.exports.showAllProduct = async (req, res) => {
    let allproduct = await productModel.find({});
    res.send(allproduct);
};