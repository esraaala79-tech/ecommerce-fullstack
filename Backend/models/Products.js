// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: false,
        trim: true 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0 
    },
    oldPrice: { 
        type: Number, 
        required: false,
        min: 0 
    },
    discount: { 
        type: Number, 
        required: false,
        min: 0,
        max: 100 
    },
    stock: { 
        type: Number, 
        required: false,
        default: 0,
        min: 0 
    },
    rating: { 
        type: Number, 
        required: false,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: { 
        type: Number, 
        required: false,
        default: 0,
        min: 0
    },
    image: { 
        type: String, 
        required: false,
        default: "" 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;