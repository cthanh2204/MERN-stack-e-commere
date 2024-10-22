import express from "express";
import {
  createProduct,
  deleteProductOne,
  getAllProduct,
  getProductOne,
  updateProduct,
} from "../controllers/productController.js";
import authToken from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminMiddleware.js  ";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProductOne);

//Admin route
router.post("/", authToken, isAdmin, createProduct);
router.put("/:id", authToken, isAdmin, updateProduct);
router.delete("/:id", authToken, isAdmin, deleteProductOne);
export default router;
