import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getProductOne = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const deleteProductOne = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res
        .status(200)
        .json({ message: "Delete Product successfully", product: product });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample Description",
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export {
  getAllProduct,
  getProductOne,
  deleteProductOne,
  createProduct,
  updateProduct,
};
