const Product = require("../models/productModel");
const Brand = require("../models/brandModel");

exports.addProduct = async (req, res) => {
  try {
    const { productName, description, price, category, brand, productImage, addedBy } = req.body;

    // Check if brand exists
    const brandDoc = await Brand.find({ brandName: brand });
    if (!brandDoc) {
      return res.status(400).json({ error: "Brand does not exist." });
    }

    // Check if the category exists within the brand's categories array
    if (!brandDoc.categories.includes(category)) {
      return res.status(400).json({ error: "Category not found in this brand." });
    }

    // Create the product
    const newProduct = new Product({
      productName,
      description,
      price,
      category,
      brand,
      productImage,
      addedBy,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params; // product ID
  const updates = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check ownership
    if (product.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only edit your own product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check ownership
    if (product.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own product" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

