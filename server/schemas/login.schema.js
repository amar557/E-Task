import mongoose from "mongoose";
import { string } from "zod";
import jwt from "jsonwebtoken";
const userRegisterSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: false,
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
});

userRegisterSchema.methods.generateJWT = async function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    "secretkeyisgiven",
    { expiresIn: "1h" }
  );

  return token;
};
export const registerModel = new mongoose.model("register", userRegisterSchema);
