import Item from "../schemas/Item.schema.js";
import order from "../schemas/order.schema.js";

export const uploadItem = async function (req, res, next) {
  const item = req.body;
  const upladedItem = await Item(item);
  upladedItem.save();
  res.send(upladedItem);
};

export const getItems = async function (req, res, next) {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.send(error);
  }
};
