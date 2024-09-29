import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import authToken from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.get("/profile", authToken, getUserProfile);
router.post("/register", registerUser);
export default router;
