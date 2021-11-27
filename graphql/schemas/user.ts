import { gql } from "apollo-server";

const userTypes = gql`
  type Token {
    token: String!
  }

  type User {
    id: Int!
    email: String!
    password: String!
    displayName: String!
    description: String!
    isAdmin: Boolean!
    isActive: Boolean!
  }

  type Mutation {
    register(
      email: String!
      password: String!
      displayName: String!
      description: String
    ): response

    login(email: String!, password: String!): Token
  }
`;

export default userTypes;
