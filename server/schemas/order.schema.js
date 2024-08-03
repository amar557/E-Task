import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    product: { type: Array },

    status: {
      type: String,
      default: "in progress",
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderSchema);

export default order;
