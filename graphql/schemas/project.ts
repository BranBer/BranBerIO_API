import { gql } from "apollo-server";

const projectTypes = gql`
  scalar Date
  scalar Image
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

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
      images: [Upload]
    ): response

    updateProject(
      id: Int!
      name: String
      description: String
      dateCreated: Date
      repoLink: String
      projectLink: String
      images: [Upload]
    ): response
  }
`;

export default projectTypes;
