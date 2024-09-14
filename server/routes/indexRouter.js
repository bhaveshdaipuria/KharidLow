const express = require("express");
const router = express.Router();
const { addProduct, showAllProduct } = require("../controllers/productController");
const { getCategoryData } = require("../controllers/generalData");
const multer = require("multer");

const upload = multer();

router.get("/allproduct", showAllProduct);
router.get("/getcategorydata", getCategoryData);
router.post("/addnewproduct", upload.single("mainImage"), addProduct);

module.exports = router;