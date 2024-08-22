const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URL = "mongodb://127.0.0.1:27017/kharidlow";

mongoose.connect(MONGO_URL);

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
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
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);