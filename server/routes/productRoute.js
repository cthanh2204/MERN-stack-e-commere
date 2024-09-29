import express from "express";
import {
  getAllProduct,
  getProductOne,
} from "../controllers/productController.js";
import authToken from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductOne);
export default router;
