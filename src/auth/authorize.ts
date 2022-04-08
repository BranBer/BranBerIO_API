import { ForbiddenError } from "apollo-server-errors";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authenticatedUser from "../types/authenticatedUser";

const getAuthorizedUser = (req: Request, res: Response) => {
  let token = req.headers.authorization;
  console.log("Getting authorized user");
  console.log(`token: ${token}`);
  console.log("Cookies");

  if (!token) return null;

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (verifiedToken) {
      console.log("SETTING COOKIE");
      res.cookie("sessionToken", verifiedToken);
    }

    return verifiedToken;
  } catch {
    return null;
  }
};

const userIsAuthorized = (user: authenticatedUser | null) => {
  if (user) {
    return true;
  }

  throw new ForbiddenError("Not Authorized");
};

const userIsAdmin = (user: authenticatedUser | null) => {
  if (user && user.isAdmin) {
    return true;
  }

  throw new ForbiddenError("Not Authorized");
};

export { getAuthorizedUser, userIsAuthorized, userIsAdmin };
