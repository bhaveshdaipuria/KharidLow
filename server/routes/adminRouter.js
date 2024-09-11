const express = require("express");
const router = express.Router();
const isauthenticate = require("../middlewares/authentication");
// const multerStorage = require("../config/multer");

const { addProduct } = require("../controllers/productController");

router.get("/product/new", (req, res) => {
    res.send("add product page");
});

router.post("/product/new", addProduct);

module.exports = router;