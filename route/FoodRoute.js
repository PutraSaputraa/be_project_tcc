import { deleteFood, getFood, getFoodByRestaurant, insertFood, updateFood } from "../controller/FoodController.js";
import express from "express";

const router = express.Router();

router.get("/", getFood);
router.post("/", insertFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);


router.get("/:id/food", getFoodByRestaurant); //get food by restaurant

export default router;