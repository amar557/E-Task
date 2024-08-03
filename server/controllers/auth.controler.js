import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerModel } from "../schemas/login.schema.js";
export const registerUser = async (req, res, next) => {
  try {
    const { password, username, email } = req.body;
    const hashedPass = bcrypt.hashSync(password, 10);
    const isEmailRegistered = await registerModel.findOne({ email });
    if (isEmailRegistered) {
      res.send("email is already registered");
    } else {
      const user = await registerModel({
        password: hashedPass,
        username,
        email,
      });
      await user.save();

      res.status(200).send({ msg: "app is orking", user });
    }
  } catch (error) {
    res.send(error);
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const findEmail = await registerModel.findOne({ email });
  if (!findEmail) {
    res.send("email not found");
  } else {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      findEmail.password
    );

    if (isPasswordCorrect) {
      const { password, ...other } = findEmail._doc;

      const token = await findEmail.generateJWT();
      // const token = await registerModel.generateJWT();

      res.cookie("jwttoken", token, { httpOnly: true });
      res.send({ other, token });
    } else {
      res.send("password is incorrect");
    }
  }
};
export const verifyUser = async function (req, res, next) {
  const token = req.header("Authorization");
  // console.log(token);
  if (!token) {
    res.send("choree krnay ay ho hain");
  }
  const tokenVerify = jwt.verify(token, "secretkeyisgiven");

  res.send(tokenVerify);
  // console.log(req.body);
  // res.send("ab kaam start karo");
};
