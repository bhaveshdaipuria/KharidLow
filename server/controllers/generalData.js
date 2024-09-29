const generalDataModel = require("../models/generaldata");

module.exports.getCategoryData = async (req, res) => {
	const categoryData = (await generalDataModel.find())[0].productCategory;
	res.status(200).json({ success: true, categoryData });
};
