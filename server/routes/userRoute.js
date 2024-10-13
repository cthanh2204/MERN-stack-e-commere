import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import authToken from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.get("/profile", authToken, getUserProfile);
router.post("/register", registerUser);
router.put("/profile", authToken, updateUserProfile);
export default router;
