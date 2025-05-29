import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    }
});

//'products' model/collection/table name in vscode and in database for all products storage
const products = mongoose.model('products', productSchema);

export default products;