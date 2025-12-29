const Product = require('../models/Product');

// GET: All products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST: Add new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, imageUrl } = req.body;
        const newProduct = new Product({ name, price, imageUrl });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product', error: err.message });
    }
};

// PUT: Update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            newProduct,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product', error: err.message });
    }
};

// DELETE: Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};
