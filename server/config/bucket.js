const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

const productBucket = () => {
  try {
    if (mongoose.connection.readyState === 1) {
      const productBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "productImage",
      });
      console.log("Product bucket service created");
      return productBucket;
    } else {
      console.error("Database is not connected");
    }
  } catch (error) {
    console.error("Error creating GridFSBucket:", error);
  }
};

module.exports = { productBucket };
