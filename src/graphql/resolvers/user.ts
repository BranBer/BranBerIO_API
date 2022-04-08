import { Resolvers, User } from "../../types/generated/graphql";
import authenticate from "../../auth/authenticate";
import UserModel from "../../models/user";
import verifyGoogleToken from "../../auth/google";
import verifyFacebookToken from "../../auth/facebook";
import { AuthenticationError } from "apollo-server-express";
import authenticatedUser from "../../types/authenticatedUser";

//TODO: Email Verification
const userResolvers: Resolvers = {
  Mutation: {
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
      }).catch((err) => {
        throw new AuthenticationError(
          "Something went wrong when trying to sign in with google"
        );
      });

      const token = authenticate(user);

      return {
        message: "Successfully logged in as google user",
        accessToken: token,
      };
    },
    loginFacebook: async (
      _,
      { inputToken, email, displayName, picture },
      __,
      ___
    ) => {
      verifyFacebookToken(inputToken).catch((err) => {
        throw new AuthenticationError(
          "Something went wrong when trying to sign in with facebook"
        );
      });

      let userData: authenticatedUser = {
        email: email,
        displayName: displayName,
        picture: picture,
        accountType: "facebook",
      };

      const [user, created] = await UserModel.findOrCreate({
        where: {
          email: email,
        },
        defaults: userData,
      })
        .then((user) => user)
        .catch((err) => {
          throw new AuthenticationError(
            "Something went wrong when trying to sign in with facebook"
          );
        });

      const token = authenticate(user);

      return {
        message: "Successfully logged in as facebook user",
        accessToken: token,
      };
    },
  },
};

export default userResolvers;
