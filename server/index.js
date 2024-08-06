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
  origin: "https://e-task-lac.vercel.app",
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

mongoose
  .connect(
    "mongodb+srv://amarhussain391:hsB6wDJQEwcBpxHU@cluster0.jsusrjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected");
  });
