const express = require("express");
const router = express.Router();
const {
	addProduct,
	showAllProduct,
	deleteProduct,
	productImage,
	editProduct,
} = require("../controllers/productController");
const { getCategoryData } = require("../controllers/generalData");
const multer = require("multer");
const { adminAuth } = require("../middlewares/authentication");
const upload = multer();

router.get("/allproduct", showAllProduct);
router.get("/getcategorydata", getCategoryData);
router.post("/addnewproduct", upload.single("mainImage"), addProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/productimage/:name", productImage);
router.put("/updateproduct/:id", upload.single("mainImage"), editProduct);

module.exports = router;
