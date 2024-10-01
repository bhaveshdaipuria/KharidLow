const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { OAuth2Client } = require("google-auth-library");

module.exports.userRegister = async (req, res) => {
	try {
		const { fullName, email, password, contactNo, address } = req.body;

		const user = await userModel.findOne({ email });

		if (user)
			return res
				.status(404)
				.json({ message: "User with this email is already registered" });
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
	try {
		const { email, password } = req.body;

		const userExists = await userModel.findOne({ email: email });

		if (!userExists) {
			return res
				.status(404)
				.send("User not registered. Please create an account");
		}
		bcrypt.compare(password, userExists.password, function (err, result) {
			if (err) {
				return res.status(500).json({ message: "Some error occured" });
			} else {
				if (result) {
					const token = jwt.sign(
						{ email: userExists.email, userid: userExists._id },
						process.env.JWT_SECRET,
					);
					if (token && userExists) {
						res.cookie("token", token, {
							httpOnly: false,
							secure: true,
						});
						return res.status(200).json({ message: "Login Successful" });
					} else {
						return res.status(500).json({ message: "Failed to login" });
					}
				} else {
					return res.status(404).json({ message: "Wrong Password" });
				}
			}
		});
	} catch (err) {
		return res.status(500).send(err.message);
	}
};

module.exports.userLogout = (req, res) => {
	res.clearCookie("token");
	res.status(204).send();
};

module.exports.googleLogin = async (req, res) => {
	try {
		const { token } = req.body;
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		const email = payload.email;

		const userExists = await userModel.findOne({ email: email });
		if (!userExists) {
			return res.status(404).json({
				success: false,
				message: "Account with this email does not exist",
			});
		}
		const jwtToken = await jwt.sign(
			{ email: userExists.email, userid: userExists._id },
			process.env.JWT_SECRET,
		);

		if (!jwtToken) {
			return res.status(404).json({ success: false, message: "Bad Request" });
		}
		res.cookie("token", jwtToken, {
			httpOnly: false,
			secure: true,
		});
		return res.status(200).json({ success: true, email });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Token Verification Failed",
		});
	}
};
