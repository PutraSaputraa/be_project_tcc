import express from "express";
import { deleteRestaurant, getFoodByRestaurant, getRestaurant, getRestaurantById, getReviewByRestaurant, insertRestaurant, updateRestaurant } from "../controller/RestaurantController.js";

const router = express.Router();

//Route awal
router.get("/", getRestaurant);
router.post("/", insertRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

router.get("/:id", getRestaurantById);

//route next level
router.get("/:id/review", getReviewByRestaurant); //get review by restaurant
router.get("/:id/food", getFoodByRestaurant); //get food by restaurant


export default router;