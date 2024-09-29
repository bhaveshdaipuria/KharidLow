const productModel = require("../models/product");
const path = require("path");
const fs = require("fs");
const { productBucket } = require("../config/bucket");
const { ObjectId } = require("mongodb");

module.exports.addProduct = async (req, res) => {
  try {
    const { originalname, buffer } = req.file || {};
    const {
      category,
      subCategory,
      item,
      productName,
      sku,
      subHead,
      summary,
      keyHighlights,
      basePrice,
      moq,
      isDiscounted,
      baseDiscount,
      taxType,
      taxRate,
    } = req.body;

    if (!sku || !productName || !category) {
      return res.status(400).json({
        success: false,
        message: "SKU, Product Name, and Category are required",
      });
    }

    if (!originalname || !buffer) {
      return res
        .status(400)
        .json({ success: false, message: "Product image is required" });
    }

    const existProduct = await productModel.findOne({ sku });
    if (existProduct) {
      return res
        .status(400)
        .json({ success: false, message: "This SKU already exists" });
    }

    const extension = path.extname(originalname);
    const uniqueName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${extension}`;
    const productCode = `${sku}_${Math.floor(10000000 + Math.random() * 90000000)}`;

    try {
      const imageBucket = productBucket();
      const imageUploadStream = imageBucket.openUploadStream(uniqueName);
      imageUploadStream.end(buffer);
      imageUploadStream.on("error", (error) => {
        console.error("Error uploading file:", error);
        return res
          .status(500)
          .json({ message: "Failed to upload the product image" });
      });

      imageUploadStream.on("finish", async () => {
        console.log("File uploaded successfully");
        console.log(imageUploadStream.id);
        try {
          const addProduct = await productModel.create({
            category,
            subCategory,
            item,
            sku,
            productCode,
            productName,
            subHead,
            summary,
            keyHighlights,
            mainImage: imageUploadStream.id,
            basePrice,
            moq,
            isDiscounted,
            baseDiscount,
            taxType,
            taxRate,
          });

          if (!addProduct) {
            return res
              .status(404)
              .json({ success: false, message: "Product could not be added" });
          }

          return res
            .status(200)
            .json({ success: true, message: "Product Created Successfully" });
        } catch (error) {
          console.error("Error creating product:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to create product in database",
          });
        }
      });
    } catch (err) {
      console.error("Error saving file:", err);
      return res
        .status(500)
        .json({ message: "Failed to save the product image" });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ message: "An unexpected error occurred", error: error.message });
  }
};

module.exports.showAllProduct = async (req, res) => {
  const allproduct = await productModel.find(
    {},
  );
  if (allproduct) {
    res.status(200).json(allproduct);
  } else {
    res.status(500).json({ err: "Could not get product list" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productDelete = await productModel.findByIdAndDelete(req.params.id);
    console.log(productDelete);

    if (!productDelete) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (productDelete.mainImage) {
      const imageId = productDelete.mainImage;

      await productBucket().delete(imageId);
    }
    return res.status(200).json({
      success: true,
      message: "Product and image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.productImage = async (req, res) => {
  try {
    const imageId = ObjectId.createFromHexString(req.params.name);
    const image = productBucket().openDownloadStream(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image Not Found",
      });
    }
    res.set("Content-Type", "image");
    res.set("X-Content-Type-Options", "nosniff");
    image.pipe(res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
