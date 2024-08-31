const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authentication");
const { userLogin, userLogout } = require("../controllers/userController");
const { addProduct, showAllProduct } = require("../controllers/productController");

router.get("/", authenticate, (req, res) => {
    console.log(req.user);
    res.send("Welcome");
});

router.get("/register", (req, res) => {
    res.render("index");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", userLogin);

router.get("/logout", userLogout);

router.get("/addproduct", (req, res) => {
    res.render("addproduct");
});

router.post("/addproduct", addProduct);

router.get("/getdata", (req, res) => {
    res.send("Data from backend");
});

router.post("/allproduct", showAllProduct);

module.exports = router;