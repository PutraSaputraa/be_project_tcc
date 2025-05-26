import express from "express";
import { deleteReview, getReview, getReviewById, insertReview, updateReview } from "../controller/ReviewController.js";
import { authenticateToken } from "../middleware/auth_middleware.js";

const router = express.Router();

//default router
router.get("/", getReview);
router.post("/", authenticateToken,insertReview);
router.put("/:id", updateReview);
router.delete("/:id", authenticateToken, deleteReview);

//next level
router.get("/:id", authenticateToken, getReviewById); //get review by user id


export default router;