import express from "express";
import {
  getAllProduct,
  getProductOne,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductOne);
export default router;
