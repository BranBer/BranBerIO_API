import { gql } from "apollo-server";

const projectTypes = gql`
  scalar Date
  scalar Image

  type Project {
    id: Int!
    name: String!
    description: String
    dateCreated: Date
    repoLink: String
    projectLink: String
    images: [Image]
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
      images: [Image]
    ): response

    updateProject(
      id: Int!
      name: String
      description: String
      dateCreated: Date
      repoLink: String
      projectLink: String
      images: [Image]
    ): response
  }
`;

export default projectTypes;
