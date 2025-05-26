import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/Database.js";
import Restaurant from "./RestaurantModel.js";

const Food = db.define("food", {
    food_name : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    food_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    categories: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
});

Restaurant.hasMany(Food, { foreignKey: "restaurant_id" });
Food.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

export default Food;