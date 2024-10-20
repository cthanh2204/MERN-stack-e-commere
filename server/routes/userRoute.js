import express from "express";
import {
  authUser,
  deleteUser,
  getAllUSers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import authToken from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminMiddleware.js  ";
const router = express.Router();

//Authentication route
router.post("/login", authUser);
router.post("/register", registerUser);

//User route
router.get("/profile", authToken, getUserProfile);
router.put("/profile", authToken, updateUserProfile);

//Admin route
router.get("/", authToken, isAdmin, getAllUSers);
router.delete("/delete/:id", authToken, isAdmin, deleteUser);
router.get("/:id", authToken, isAdmin, getUserById);
router.put("/update/:id", authToken, isAdmin, updateUser);
export default router;
