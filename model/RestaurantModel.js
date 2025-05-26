import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/Database.js";

const Restaurant = db.define("restaurant", {
    restaurant_name : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    type : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
});

export default Restaurant;