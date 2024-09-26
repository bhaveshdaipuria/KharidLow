const generalDataModel = require("../models/generaldata");

module.exports.getCategoryData = async (req, res) => {
  // res.send("Some data");
  let categoryData = (await generalDataModel.find())[0].productCategory;
  res.send(categoryData);
};
