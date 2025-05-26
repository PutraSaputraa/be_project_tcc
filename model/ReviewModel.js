import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";
import Restaurant from "./RestaurantModel.js";
import User from "./UserModel.js";

const Review = db.define("review", {
    foodReview: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Restaurant.hasMany(Review, { foreignKey: "restaurant_id" });
Review.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

export default Review;