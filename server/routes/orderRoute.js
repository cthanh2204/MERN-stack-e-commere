import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import authToken from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminMiddleware.js";
const router = express.Router();
router.post("/", authToken, addOrderItems);
router.get("/my-orders", authToken, getMyOrders);
router.get("/:id", authToken, getOrderById);
router.put("/:id/pay", authToken, updateOrderToPaid);

//Admin route
router.get("/", authToken, isAdmin, getAllOrders);
router.put("/:id/delivered", authToken, isAdmin, updateOrderToDelivered);
export default router;
