const mongoose = require("mongoose")
const categoriesSchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    }
})
const CATEGORIES = mongoose.model("CATEGORIES",categoriesSchema);
module.exports = CATEGORIES;