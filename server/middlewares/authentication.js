const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

function adminAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error(err);
      } else {
        const userRole = (await userModel.findOne({ email: decoded.email }))
          .role;
        if (userRole === "admin") {
          next();
        } else {
          res.status(401).json({ err: "Only admin allowed" });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { adminAuth };
