const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.userRegister = async (req, res) => {
  try {
    const { fullName, email, password, contactNo, address } = req.body;

    const user = await userModel.findOne({ email });

    if (user) return res.status(404).send("User already exist. Please login");
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error(err);
        }
        const createdUser = await userModel.create({
          fullName,
          password: hash,
          email,
          address,
          contactNo,
        });

        const token = jwt.sign(
          { email: email, userid: createdUser._id },
          process.env.JWT_SECRET,
        );

        if (token && createdUser) {
          res.cookie("token", token, {
            secure: true,
            httpOnly: false,
          });
          res.status(200).json({ loginStatus: true, message: "success" });
        } else {
          res.status(404).json({ loginStatus: false, message: "failed" });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

module.exports.userLogin = async (req, res) => {
  let { email, password } = req.body;

  let isUserExist = await userModel.findOne({ email: email });

  if (!isUserExist) {
    return res
      .status(404)
      .send("User not registered. Please create an account");
  }

  try {
    bcrypt.compare(password, isUserExist.password, function (err, result) {
      if (err) {
        return res.status(500).send("Something went wrong");
      }
      if (result) {
        let token = jwt.sign(
          { email: isUserExist.email, userid: isUserExist._id },
          process.env.JWT_SECRET,
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 15 * 24 * 60 * 60 * 1000,
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
    secure: true,
  });
  res.status(201).redirect("/profile");
};
