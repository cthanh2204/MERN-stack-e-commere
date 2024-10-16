import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import authToken from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/", authToken, addOrderItems);
router.get("/:id", authToken, getOrderById);
router.put("/:id/pay", authToken, updateOrderToPaid);
export default router;
