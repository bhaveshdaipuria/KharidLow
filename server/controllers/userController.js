const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.userLogin = async (req, res) => {
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
};

module.exports.userLogout = (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
};