import express from "express";
import * as productControllers from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(productControllers.getProducts)
  .post(protect, isAdmin, productControllers.createProduct);
router
  .route("/:id/reviews")
  .post(protect, productControllers.createProductReview);
router.get("/top", productControllers.getTopProducts);
router
  .route("/:id")
  .get(productControllers.getProductById)
  .delete(protect, isAdmin, productControllers.deleteProduct)
  .put(protect, isAdmin, productControllers.updateProduct);

export default router;
