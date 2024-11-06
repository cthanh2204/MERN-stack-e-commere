import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
const addOrderItems = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = await Order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      res.status(201).json(order);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      res.status(500);
      throw new Error("Order not found");
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updateTime: req.body.update_time,
        email_address: req.body.email_address,
      };
    }

    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user._id });
    res.status(200).json(myOrders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    let user = null;
    if (req.query.keyword) {
      user = await User.findOne({
        email: { $regex: req.query.keyword, $options: "i" },
      });
    }

    const keyword = user ? { user: user._id } : {};

    const count = await Order.countDocuments({ ...keyword });

    const orders = await Order.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate("user", "name email");

    if (orders.length === 0) {
      throw new Error("Order not found");
    } else {
      res
        .status(200)
        .json({ orders, page, pages: Math.ceil(count / pageSize) });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
};
