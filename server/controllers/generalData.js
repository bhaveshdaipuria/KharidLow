const generalDataModel = require("../models/generaldata");

module.exports.getCategoryData = async (req, res) => {
    let categoryData = (await generalDataModel.find())[0].productCategory;
    res.send(categoryData);
};