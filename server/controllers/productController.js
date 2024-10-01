const productModel = require("../models/product");
const cartModel = require("../models/cart");
const wishlistModel = require("../models/wishlist");
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
	const allproduct = await productModel.find({});
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

module.exports.editProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		console.log(req.file);
		const productDetails = await productModel.findById(productId);
		if (!productDetails) {
			return res.status(404).json({
				success: false,
				message: "This product could not be found",
			});
		}
		const imageId = productDetails.mainImage;
		if (req.file) {
			const imageDelete = await productBucket().delete(imageId);
			if (imageDelete) {
				const imageUploadStream = productBucket().openUploadStream(uniqueName);
				imageUploadStream.end(buffer);
				imageUploadStream.on("error", (error) => {
					return res
						.status(500)
						.json({ message: "Failed to upload the product image" });
				});

				imageUploadStream.on("finish", async () => {
					const newProduct = {
						...req.body,
						mainImage: imageUploadStream.id,
					};
					const updateProduct = await productModel.findByIdAndUpdate(
						productId,
						newProduct,
					);
					if (!updateProduct) {
						res.status(404).json({
							success: false,
							message: "Could not update the product",
						});
					}
					return res.status(200).json({
						success: true,
						message: "Product Updated Successfully",
					});
				});
			}
		}

		const newProduct = { ...req.body };
		const updateProduct = await productModel.findByIdAndUpdate(
			productId,
			newProduct,
			{ new: true, runValidators: false, overwrite: false },
		);
		if (!updateProduct) {
			res.status(404).json({
				success: false,
				message: "Could not update the product",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Product Updated Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

module.exports.addToCart = async (req, res) => {
	try {
		const userId = req.user._id; // Assuming that we have user ID
		const productId = req.params.id;
		const quantity = req.body.quantity || 6;

		const product = await productModel.findById(productId);
		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		let cart = await cartModel.findOne({ user: userId });

		if (!cart) {
			cart = new cartModel({
				user: userId,
				items: [{ product: productId, quantity }],
			});
		} else {
			const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

			if (productIndex > -1) {
				cart.items[productIndex].quantity += quantity;
			} else {
				cart.items.push({ product: productId, quantity });
			}
		}

		await cart.save();

		return res.status(200).json({ success: true, message: "Product added to cart", cart });

	} catch (error) {
		return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
	}
};

module.exports.addToWishlist = async (req, res) => {
	const productId = req.params.id;
	const userId = req.user._id;

	const product = await productModel.findById(productId);
	if (!product) {
		return res.status(404).json({ success: false, message: "Product not found" });
	}

	let wishlist = await wishlistModel.findOne({ productId: productId });

	if (!wishlist) {
		wishlist = new wishlistModel({
			user: userId,
			productId: productId
		});

		await wishlist.save();

		return res.status(200).json({ success: true, message: "Product added to wishlist", wishlist });
	} else {
		return res.status(200).json({ success: true, message: "Already added to wishlist" });
	}
}