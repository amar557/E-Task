import express from "express";
import {
  createOrder,
  getOrders,
  getOrdersconditionaly,
  updateItemStatus,
} from "../controllers/orders.controller.js";
import { orderval, validateOrder } from "../validators/order.valid.js";

const orderRouter = express.Router();
orderRouter.post("/orders", validateOrder(orderval), createOrder);
orderRouter.get("/get/orders", getOrders);
orderRouter.put("/status/:id", updateItemStatus);
orderRouter.get("/status", getOrdersconditionaly);
export default orderRouter;
