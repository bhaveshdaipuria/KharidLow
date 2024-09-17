const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "customer"
    },
    contactNo: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);