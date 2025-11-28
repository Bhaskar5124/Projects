import mongoose from "mongoose";

// --- Product Schema ---
const ProductSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    category: String,
    price: Number,
    rating: Number
}, { _id: false, versionKey: false });

const Product = mongoose.model('Product', ProductSchema);

export default Product;