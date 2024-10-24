import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getAllProduct = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (products.length === 0) {
      throw new Error("Product not found");
    } else {
      res
        .status(200)
        .json({ products, page, pages: Math.ceil(count / pageSize) });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const createNewReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already review");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comments,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReview = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(200).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getProductCarousel = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find().sort({ rating: -1 }).limit(3);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export {
  getAllProduct,
  getProductOne,
  deleteProductOne,
  createProduct,
  updateProduct,
  createNewReview,
  getProductCarousel,
};
