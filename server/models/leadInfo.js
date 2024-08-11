const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadInfoSchema = new Schema({
    customerName: {
        type: String,
        require: true
    },
    contactNo: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});
 
module.exports = mongoose.model("LeadInfo", leadInfoSchema);