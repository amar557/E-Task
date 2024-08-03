import order from "../schemas/order.schema.js";

export const createOrder = async function (req, res, next) {
  const createdorder = await order(req.body);
  await createdorder.save();
  res.send(createdorder);
};
export const getOrders = async function (req, res, next) {
  const orders = await order.find();
  res.send(orders);
};
export const updateItemStatus = async function (req, res, next) {
  const id = req.params.id;
  console.log(req.body);
  try {
    const ord = await order.findByIdAndUpdate(id, req.body, { new: true });
    if (!ord) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send(ord);
  } catch (error) {
    next(error);
  }
};

export const getOrdersconditionaly = async function (req, res, next) {
  try {
    const filters = {};
    if (req.query.status) {
      filters.status = req.query.status;
    }
    const orders = await order.find(filters);
    res.send(orders);
  } catch (error) {
    next(error);
  }
};
