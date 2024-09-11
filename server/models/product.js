const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     productName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 3,
//         maxlength: 255
//     },
//     productSku: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         index: true
//     },
//     productImages: {
//         type: [String],
//         required: true,
//         validate: {
//             validator: function(value) {
//                 return value.length <= 5;
//             },
//             message: '{VALUE} is too long'
//         }
//     },
//     productTagline: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 50
//     },
//     variant: {
//         type: Object,
//         required: true,
//         validate: {
//             validator: function(variant) {
//                 return Object.keys(variant).length === 2 &&
//                     typeof variant.size === 'number' &&
//                     typeof variant.color === 'string';
//             },
//             message: 'Variant must contain size and color'
//         }
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 99999
//     },
//     productMOQ: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 1000000
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 1000000
//     },
//     discount: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 100
//     },
//     productSummary: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 255
//     },
//     productDescription: {
//         type: Object,
//         required: true,
//         validate: {
//             validator: function(description) {
//                 return typeof description.title === 'string' &&
//                     typeof description.content === 'string';
//             },
//             message: 'Product description must contain title and content'
//         }
//     },
//     productCode: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         index: true
//     }
// }, { timestamps: true });

// // Virtual field for formatted price
// productSchema.virtual('formattedPrice').get(function() {
//     return `$${this.price.toFixed(2)}`;
// });

// // Pre-save hook to sanitize input
// productSchema.pre('save', function(next) {
//     if (this.productSku) {
//         this.productSku = this.productSku.toLowerCase().trim();
//     }
//     next();
// });

// // Pre-save hook to validate variant
// productSchema.pre('save', function(next) {
//     if (this.variant) {
//         const variantKeys = Object.keys(this.variant);
//         if (variantKeys.length !== 2) {
//             next(new Error('Variant must contain only size and color'));
//         } else if (typeof this.variant.size !== 'number' || typeof this.variant.color !== 'string') {
//             next(new Error('Variant size must be a number and color must be a string'));
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

// const productSchema = new mongoose.Schema({
//     category: {
//         type: String,
//         required: true
//     },
//     subCategory: {
//         type: String,
//         required: true
//     },
//     item: {
//         type: String,
//         required: true
//     },
//     productName: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 3,
//         maxlength: 255
//     },
//     subHead: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 550
//     },
//     summary: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     keyHighlights: [{
//         key: {
//             type: String,
//             required: true
//         },
//         value: {
//             type: String,
//             required: true
//         }
//     }],
//     mainImage: {
//         type: String,
//         required: true
//     },
//     productImages: [{
//         type: String,
//         required: true,
//         validate: {
//             validator: function (value) {
//                 return value.length <= 5;
//             },
//             message: '{VALUE} is too long'
//         }
//     }],
//     basePrice: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 100000
//     },
//     moq: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 10000
//     },
//     isDiscounted: {
//         type: Boolean,
//         required: true
//     },
//     baseDiscount: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 100
//     },
//     isQtyBasedPricing: {
//         type: Boolean,
//         required: true
//     },
//     qtyPriceSlabs: [{
//         moq: {
//             type: Number,
//             required: true
//         },
//         discount: {
//             type: Number,
//             required: true
//         }
//     }],
//     isSizeVariable: {
//         type: Boolean,
//         required: true
//     },
//     sizeVariations: [{
//         size: {
//             type: Number,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         }
//     }],
//     isColorVariable: {
//         type: Boolean,
//         required: true
//     },
//     colorVariations: [{
//         name: {
//             type: String,
//             required: true
//         },
//         hexCode: {
//             type: String,
//             required: true
//         },
//         image: {
//             type: String,
//             required: true
//         }
//     }],
//     taxType: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true });

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    subHead: {
        type: String,
        required: true,
        trim: true,
        maxlength: 550
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    keyHighlights: [{
        key: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    mainImage: {
        type: String,
        required: true
    },
    productImages: [{
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length <= 5;
            },
            message: '{VALUE} is too long'
        }
    }],
    basePrice: {
        type: Number,
        required: true,
        min: 0,
        max: 100000
    },
    moq: {
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
    isDiscounted: {
        type: Boolean,
        required: true
    },
    baseDiscount: {
        type: Number,
        min: 0,
        max: 100,
        validate: {
            validator: function (value) {
                // If isDiscounted is true, baseDiscount is required
                if (this.isDiscounted) {
                    return value !== null && value !== undefined;
                }
                return true; // No validation if isDiscounted is false
            },
            message: 'Base discount is required when product is discounted'
        }
    },
    isQtyBasedPricing: {
        type: Boolean,
        required: true
    },
    qtyPriceSlabs: [{
        moq: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        }
    }],
    qtyPriceSlabs: {
        type: [{
            moq: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                required: true
            }
        }],
        validate: {
            validator: function (value) {
                // Validate qtyPriceSlabs only if isQtyBasedPricing is true
                if (this.isQtyBasedPricing) {
                    return value.length > 0;
                }
                return true; // No validation if isQtyBasedPricing is false
            },
            message: 'Quantity price slabs are required when quantity-based pricing is enabled'
        }
    },
    isSizeVariable: {
        type: Boolean,
        required: true
    },
    sizeVariations: {
        type: [{
            size: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
        validate: {
            validator: function (value) {
                // Validate sizeVariations only if isSizeVariable is true
                if (this.isSizeVariable) {
                    return value.length > 0;
                }
                return true; // No validation if isSizeVariable is false
            },
            message: 'Size variations are required when size variability is enabled'
        }
    },
    isColorVariable: {
        type: Boolean,
        required: true
    },
    colorVariations: {
        type: [{
            name: {
                type: String,
                required: true
            },
            hexCode: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }],
        validate: {
            validator: function (value) {
                // Validate colorVariations only if isColorVariable is true
                if (this.isColorVariable) {
                    return value.length > 0;
                }
                return true; // No validation if isColorVariable is false
            },
            message: 'Color variations are required when color variability is enabled'
        }
    },
    taxType: {
        type: String,
        required: true
    }
}, { timestamps: true });

productSchema.index({ productCode: 1 }, { unique: true });
productSchema.index({ sku: 1 }, { unique: true });

module.exports = productSchema;

module.exports = mongoose.model("product", productSchema);