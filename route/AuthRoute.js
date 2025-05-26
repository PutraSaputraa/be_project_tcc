import express from "express";
import { Login, Logout, Register } from "../controller/AuthController.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

//Route
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/token", refreshToken);

export default router;