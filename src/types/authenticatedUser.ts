import { User } from "./generated/graphql";

type authenticatedUser = Omit<User, "password" | "id">;

export default authenticatedUser;
