import { responseType } from "../schemas/response";
import { Project, Resolvers } from "../generated/types/graphql";
import ProjectModel from "../../models/project";
import { ApolloError, ValidationError } from "apollo-server-errors";

const projectsPerPage: number = 24;
const projectResolvers: Resolvers = {
  Query: {
    projects: async (_, args, context, ____) => {
      const projects = await ProjectModel.findAll({
        limit: args.size,
        offset: (args.page - 1) * args.size,
      });

      return projects;
    },
  },
  Mutation: {
    createProject: async (_, args, context, ____) => {
      const project = ProjectModel.build(args);
      await project.save();

      if (!project) {
        throw new ApolloError("Something went wrong when creating a project");
      }

      return {
        message: "Successfully created a project",
      } as responseType;
    },
    updateProject: async (_, args, context, ____) => {
      let projectFields = removeNullKeyValues({
        dateCreated: args.dateCreated,
        description: args.description,
        id: args.id,
        images: args.images,
        name: args.name as string,
        projectLink: args.projectLink,
        repoLink: args.repoLink,
      });

      ProjectModel.update(projectFields, { where: { id: args.id } });
      return {
        message: "Successfully created a project",
      } as responseType;
    },
  },
};

export default projectResolvers;
