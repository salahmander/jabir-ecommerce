import express from "express";
import * as orderController from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(protect, orderController.addOrderItems)
  .get(protect, isAdmin, orderController.getOrders);
router.route("/myorders").get(protect, orderController.getMyOrders);
router.route("/:id").get(protect, orderController.getOrderById);
router.route("/:id/pay").put(protect, orderController.updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, isAdmin, orderController.updateOrderToDelivered);

export default router;
