const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

router.post("/register", async (req, res) => {

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

module.exports = router;