import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getUsers,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();
router.route("/").get(protect, getUsers).post(registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(deleteUser);

export default router;
