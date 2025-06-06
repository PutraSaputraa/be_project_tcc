import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/Database.js";

const User = db.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

export default User;