import express from "express";
import * as userControllers from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(userControllers.registerUser)
  .get(protect, isAdmin, userControllers.getUsers);
router.post("/login", userControllers.authUser);
router
  .route("/profile")
  .get(protect, userControllers.getUserProfile)
  .put(protect, userControllers.UpdateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, userControllers.deleteUser)
  .get(protect, isAdmin, userControllers.getUserById)
  .put(protect, isAdmin, userControllers.updateUser);

export default router;
