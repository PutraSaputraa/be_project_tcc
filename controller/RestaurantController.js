import { where } from "sequelize";
import Food from "../model/FoodModel.js";
import Restaurant from "../model/RestaurantModel.js";
import Review from "../model/ReviewModel.js";


//Get all Restaurant
export const getRestaurant = async(req, res) => {
    try {
        const response = await Restaurant.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}

export const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Restaurant.findOne({ where: { id } });
    if (!response) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Insert Restaurant to katalog databse
export const insertRestaurant = async(req, res) => {
    try {
        await Restaurant.create(req.body);
        res.status(201).json({msg: "Inserting Restaurant success!"});
    } catch (error) {
        console.log(error.msg);
    }
}

export const updateRestaurant = async(req,res) => {
    try {
        await Restaurant.update(req.body, {
            where: {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Update Restaurant success"});
    } catch (error) {
        console.log(error.msg);
    }
}

export const deleteRestaurant = async(req,res) => {
    try {
        await Restaurant.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Delete Restaurant Success!"});
    } catch (error) {
        console.log(error.msg);
    }
}

//Get Food by Restaurant
export const getFoodByRestaurant = async(req, res) => {
    try {
        const response = await Food.findAll({
            where: {
                restaurant_id : req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}

//Get Food food review by restaurant
export const getReviewByRestaurant = async(req, res) => {
    try {
        const response = await Review.findAll({
            where: {
                restaurant_id : req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}