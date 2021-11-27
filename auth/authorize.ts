import { Context } from "apollo-server-core";
import { ForbiddenError } from "apollo-server-errors";
import { Request } from "express";
import jwt from "jsonwebtoken";
import authenticatedUser from "../types/authenticatedUser";
import { User } from "../types/generated/graphql";

const getAuthorizedUser = (req: Request) => {
  let token = req.headers.authorization;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
};

const userIsAuthorized = (user: authenticatedUser | null) => {
  if (user) {
    return;
  }

  throw new ForbiddenError("Not Authorized");
};

export { getAuthorizedUser, userIsAuthorized };
