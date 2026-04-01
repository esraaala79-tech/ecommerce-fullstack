// backend/Controllers/ProductController.js
const Product = require("../models/Products");

const createProduct = async (req, res) => {
    try {
        console.log(req.body);

        const product = new Product({
            ...req.body, 
            image: req.file ? req.file.filename : "",
            createdBy: req.user._id
        });

        await product.save();
        await product.populate('createdBy', 'username email');

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('createdBy', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy', 'username email');

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (
            req.user.role !== 'admin' &&
            product.createdBy.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        Object.assign(product, req.body);

        if (req.file) {
            product.image = req.file.filename;
        }

        await product.save();
        await product.populate('createdBy', 'username email');

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (
            req.user.role !== 'admin' &&
            product.createdBy.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await product.deleteOne();

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductsByUser = async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.params.userId })
            .populate('createdBy', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByUser
};