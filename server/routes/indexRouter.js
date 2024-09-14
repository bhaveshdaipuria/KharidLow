const express = require("express");
const router = express.Router();
const { addProduct, showAllProduct } = require("../controllers/productController");
const { getCategoryData } = require("../controllers/generalData");
const multer = require("multer");

const upload = multer();

router.get("/", (req, res) => {
    res.send("This is Home Page");
});

router.post("/addnewproduct", upload.single("mainImage"), addProduct);

router.get("/register", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/allproduct", showAllProduct);

router.get("/getcategorydata", getCategoryData);

module.exports = router;