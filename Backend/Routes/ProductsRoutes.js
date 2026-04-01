const express = require('express');
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); 
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByUser
} = require("../Controllers/ProductController");

const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/user/:userId', getProductsByUser);

// Protected routes (require login + admin role)
router.post('/', protect, roleMiddleware, upload.single("image"), createProduct); 
router.put('/:id', protect, roleMiddleware, updateProduct);
router.delete('/:id', protect, roleMiddleware, deleteProduct);

module.exports = router;