import { Resolvers, User } from "../../types/generated/graphql";
import authenticate from "../../auth/authenticate";
import UserModel from "../../models/user";
import verifyGoogleToken from "../../auth/google";
import { AuthenticationError } from "apollo-server-express";
import authenticatedUser from "../../types/authenticatedUser";

//TODO: Email Verification
const userResolvers: Resolvers = {
  Mutation: {
    login: async (_, args, __, ___) => {
      return { token: await authenticate(args.email, args.password) };
    },
    register: async (_, args, __, ___) => {
      let user = await UserModel.create(args as Omit<User, "id">);

      return {
        message: "Successfully registered a user",
      };
    },
    loginGoogle: async (
      _,
      { idToken, email, displayName, picture },
      __,
      ___
    ) => {
      verifyGoogleToken(idToken).catch((err) => {
        throw new AuthenticationError(
          "Something went wrong when trying to sign in with google"
        );
      });

      let userData: authenticatedUser = {
        email: email,
        displayName: displayName,
        picture: picture,
        accountType: "google",
      };

      let [user, created] = await UserModel.findOrCreate({
        where: {
          email: email,
        },
        defaults: userData,
      });

      if (!user) {
        throw new AuthenticationError(
          "Something went wrong when trying to sign in with google"
        );
      }

      return {
        message: "Successfully logged in as google user",
      };
    },
  },
};

export default userResolvers;
