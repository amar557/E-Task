import express from "express";
import { uploadItem, getItems } from "../controllers/Item.cntrlr.js";
const itemRouter = express.Router();
itemRouter.post("/item", uploadItem);
itemRouter.get("/item/getall", getItems);

export default itemRouter;
