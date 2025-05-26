import "./model/UserModel.js"
import "./model/RestaurantModel.js"
import "./model/ReviewModel.js"
import "./model/FoodModel.js"

import express from "express";
import cors from "cors";
import foodRoutes from "./route/FoodRoute.js";
import reviewRoutes from "./route/ReviewRoute.js";
import restaurantRoutes from "./route/RestaurantRoute.js";
import auth from "./route/AuthRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors({
    origin:  "http://localhost:3000",
    credentials: true
}));

app.use("/food", foodRoutes);
app.use("/review", reviewRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/auth", auth);

app.get("/", (req, res) => res.render("index"));


export default app;
