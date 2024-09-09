const generalDataModel = require("../models/generaldata");

module.exports.getCategoryData = async (req, res) => {
    let categoryData = await generalDataModel.find();
    res.send(categoryData);
};