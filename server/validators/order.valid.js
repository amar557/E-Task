import { z } from "zod";

export const orderval = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .min(3, "username must be atleast 3 charcter"),
  address: z
    .string()
    .min(1, "Username is required")
    .min(3, "username must be atleast 3 charcter"),
  phone: z
    .string()
    .min(1, "Username is required")
    .min(3, "username must be atleast 3 charcter"),
});
export const validateOrder = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.send(error.issues[0].message);
  }
};
