import express from "express";
import {
  authUser,
  deleteUser,
  getAllUSers,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import authToken from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminMiddleware.js  ";
const router = express.Router();

router.post("/login", authUser);
router.get("/profile", authToken, getUserProfile);
router.post("/register", registerUser);
router.put("/profile", authToken, updateUserProfile);
router.get("/", authToken, isAdmin, getAllUSers);
router.delete("/delete/:id", authToken, isAdmin, deleteUser);
export default router;
