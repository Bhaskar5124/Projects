import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    productName: {
        type: String,
        ref: 'products',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
});

//'cart' model/collection/table name in vscode and in database for cart items storage
const cart = mongoose.model('cart',cartSchema);

export default cart;

