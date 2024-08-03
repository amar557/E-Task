import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemRouter from "./routes/item.route.js";
import authRouter from "./routes/auth.route.js";
import orderRouter from "./routes/orders.route.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const corspolicy = {
  origin: "*",
  Credential: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corspolicy));
app.use(express.json());
app.get("/route", (req, res) => res.send("its workon"));
app.use("/api", itemRouter);
app.use("/api", orderRouter);
app.use("/api/auth", authRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
});
