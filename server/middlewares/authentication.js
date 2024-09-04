const jwt = require("jsonwebtoken");

async function authentication(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data;
            next();
        } catch (error) {
            return res.status(401).json({ error: "Some error" });
        }
    }
}

module.exports = authentication;