const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URL = "mongodb://127.0.0.1:27017/kharidlow";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err); 
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    role: {
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
    contactNo: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("User", userSchema);