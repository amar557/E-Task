import Item from "../schemas/Item.schema.js";
import order from "../schemas/order.schema.js";

export const uploadItem = async function (req, res, next) {
  try {
    const item = req.body;
    const upladedItem = await Item(item);
    await upladedItem.save();
    res.send(upladedItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getItems = async function (req, res, next) {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.send(error);
  }
};
