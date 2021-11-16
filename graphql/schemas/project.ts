import { gql } from "apollo-server";

const projectTypes = gql`
  scalar Date

  type Project {
    id: Int!
    name: String!
    description: String
    dateCreated: Date
    repoLink: String
    projectLink: String
    images: [String]
  }

  type Query {
    projects(page: Int!, size: Int!): [Project]
  }

  type Mutation {
    createProject(
      name: String!
      description: String
      dateCreated: Date
      repoLink: String
      projectLink: String
      images: [String]
    ): response

    updateProject(
      id: Int!
      name: String
      description: String
      dateCreated: Date
      repoLink: String
      projectLink: String
      images: [String]
    ): response
  }
`;

export default projectTypes;
