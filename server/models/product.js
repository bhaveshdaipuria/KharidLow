const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     productName: {
//         type: String,
//         require: true
//     },
//     productSku: {
//         type: String,
//         require: true,
//         unique: true 
//     },
//     productImages: {
//         type: [String],
//         require: true
//     },
//     productTagline: {
//         type: String,
//         require: true
//     },
//     variant: {
//         type: Object,
//         require: true
//     },
//     quantity: {
//         type: Number,
//         require: true
//     },
//     productMOQ: {
//         type: Number,
//         require: true
//     },
//     price: {
//         type: Number,
//         require: true
//     },
//     discount: {
//         type: Number,
//         require: true
//     },
//     productSummary: {
//         type: String,
//         require: true
//     },
//     productDescription: {
//         type: Object,
//         require: true
//     },
//     productCode: {
//         type: String,
//         require: true
//     }
// }, { timestamps: true });

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    productSku: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    productImages: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length <= 5;
            },
            message: '{VALUE} is too long'
        }
    },
    productTagline: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    variant: {
        type: Object,
        required: true,
        validate: {
            validator: function(variant) {
                return Object.keys(variant).length === 2 &&
                    typeof variant.size === 'number' &&
                    typeof variant.color === 'string';
            },
            message: 'Variant must contain size and color'
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 99999
    },
    productMOQ: {
        type: Number,
        required: true,
        min: 1,
        max: 1000000
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    productSummary: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    productDescription: {
        type: Object,
        required: true,
        validate: {
            validator: function(description) {
                return typeof description.title === 'string' &&
                    typeof description.content === 'string';
            },
            message: 'Product description must contain title and content'
        }
    },
    productCode: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    }
}, { timestamps: true });

// Virtual field for formatted price
productSchema.virtual('formattedPrice').get(function() {
    return `$${this.price.toFixed(2)}`;
});

// Pre-save hook to sanitize input
productSchema.pre('save', function(next) {
    if (this.productSku) {
        this.productSku = this.productSku.toLowerCase().trim();
    }
    next();
});

// Pre-save hook to validate variant
productSchema.pre('save', function(next) {
    if (this.variant) {
        const variantKeys = Object.keys(this.variant);
        if (variantKeys.length !== 2) {
            next(new Error('Variant must contain only size and color'));
        } else if (typeof this.variant.size !== 'number' || typeof this.variant.color !== 'string') {
            next(new Error('Variant size must be a number and color must be a string'));
        } else {
            next();
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("product", productSchema);