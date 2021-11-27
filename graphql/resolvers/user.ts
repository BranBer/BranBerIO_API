import { Resolvers, User } from "../../types/generated/graphql";
import authenticate from "../../auth/authenticate";
import UserModel from "../../models/user";
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
  },
};

export default userResolvers;
