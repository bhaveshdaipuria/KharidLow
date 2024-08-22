const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user");
const productModel = require("./models/product");
const authenticate = require("./middleware/authentication");


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", authenticate, (req, res) => {
  console.log(req.user);
  res.send("Welcome");
});

app.get("/register", (req, res) => {
  res.render("index");
})

app.get("/login", (req, res) => {
  res.send("Here is login route");
})

app.post("/register", async (req, res) => {

  let { name, password, email, address, contactNo } = req.body;

  let user = await userModel.findOne({ email });

  if (user) return res.status(500).send("User already exist");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        name,
        password: hash,
        email,
        address,
        contactNo
      });

      let token = jwt.sign({ email: email, userid: createdUser._id }, "shhhhh");

      res.cookie("token", token);
      res.send("Registered");
    })
  })

});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let existUser = await userModel.findOne({ email: email });

  if (!existUser) {
    return res.status(500).send("This username is not registered");
  }

  bcrypt.compare(password, existUser.password, function (err, result) {
    if (err) {
      return res.status(500).send("Something went wrong");
    }
    if (result) {
      let token = jwt.sign({ email: existUser.email, userid: existUser._id }, "shhhhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });

});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/addproduct", (req, res) => {
  res.render("addproduct");
});

app.post("/addproduct", async (req, res) => {
  let { productName, productSku, productImage, productTagline, variant, quantity, price, discount, productSummary, productDescription, productCode } = req.body;

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
    price,
    discount,
    productSummary,
    productDescription,
    productCode
  });

  console.log(addProduct);
  res.send("Product Created Successfully");

});

app.post("/allproduct", async (req, res) => {
  let allproduct = await productModel.find({});

  res.send(allproduct);
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});