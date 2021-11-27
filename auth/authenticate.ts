import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-errors";
import authenticatedUser from "../types/authenticatedUser";

const authenticate = async (email: string, password: string) => {
  let user = await UserModel.findOne({ where: { email: email.toLowerCase() } });

  if (!user) {
    throw new AuthenticationError("Invalid credentials");
  }

  let isCorrectPassword = user.comparePassword(password);

  if (!isCorrectPassword) {
    throw new AuthenticationError("Invalid credentials");
  }

  let userJson = user.toJSON() as authenticatedUser;

  let token = jwt.sign(userJson, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export default authenticate;
