import express from "express";
import { loginUser, verifyUser } from "../controllers/auth.controler.js";
const authRouter = express.Router();
authRouter.post("/login", loginUser);
authRouter.get("/verifyUser", verifyUser);
export default authRouter;
