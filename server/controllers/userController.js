const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.userRegister = async (req, res) => {

    let { name, email, password, contactNo, address } = req.body;

    let user = await userModel.findOne({ email });

    if (user) return res.status(500).send("User already exist. Please login");

    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let createdUser = await userModel.create({
                    name,
                    password: hash,
                    email,
                    address,
                    contactNo
                });

                let token = jwt.sign({ email: email, userid: createdUser._id }, process.env.JWT_SECRET);

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 15 * 24 * 60 * 60 * 1000
                });
                res.send("Registered");
            })
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.userLogin = async (req, res) => {
    let { email, password } = req.body;

    let isUserExist = await userModel.findOne({ email: email });

    if (!isUserExist) {
        return res.status(500).send("User not registered. Please craete a account");
    }

    try {
        bcrypt.compare(password, isUserExist.password, function (err, result) {
            if (err) {
                return res.status(500).send("Something went wrong");
            }
            if (result) {
                let token = jwt.sign({ email: isUserExist.email, userid: isUserExist._id }, process.env.JWT_SECRET);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 15 * 24 * 60 * 60 * 1000
                });
                res.status(200).redirect("/profile");
            } else {
                res.redirect("/login");
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }

};

module.exports.userLogout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true
    });
    res.status(201).redirect("/profile");
};