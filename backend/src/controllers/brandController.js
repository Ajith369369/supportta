const Brand = require("../models/brandModel");

exports.addBrand = async (req, res) => {
  try {
    const { brandName, brandLogo, categories } = req.body;
    const userId = req.user.id; // assuming JWT middleware sets req.user

    const existing = await Brand.findOne({ brandName });
    if (existing) {
      return res.status(400).json({ error: "Brand already exists" });
    }

    const brand = await Brand.create({
      brandName,
      brandLogo,
      categories,
      createdBy: userId,
    });

    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
