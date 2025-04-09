const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
const User = require("../models/userModel");

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { productName, description, price, category, brand, productImage, addedBy } = req.body;

    // Check if brand exists
    const brandDoc = await Brand.findOne({ brandName: brand });
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

// All products with filters
exports.getAllProductsAddedByAllUsers = async (req, res) => {
  const { brand, category, order = "desc" } = req.query;
  const loggedInUserId = req.user?.id; // Assuming JWT auth middleware is applied

  try {
    // Get users who have blocked the current user
    const blockingUsers = await User.find({ blockedUsers: loggedInUserId }).select("_id");
    const blockedByUserIds = blockingUsers.map(user => user._id);

    // Build query
    let query = {
      addedBy: { $nin: blockedByUserIds }, // Exclude products from users who blocked you
    };

    if (brand) query.brand = brand;
    if (category) query.category = category;

    // Sorting logic
    const sortOptions = {};
    if (sortBy === "price" || sortBy === "product-name") {
      sortOptions[sortBy === "product-name" ? "productName" : "price"] = order === "asc" ? 1 : -1;
    }

    // Fetch products
    const products = await Product.find(query)
      .populate("addedBy", "username")
      .sort(sortOptions);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Only my products
exports.getMyProducts = async (req, res) => {
  const userId = req.user.id;

  try {
    const myProducts = await Product.find({ addedBy: userId });
    res.status(200).json(myProducts);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
