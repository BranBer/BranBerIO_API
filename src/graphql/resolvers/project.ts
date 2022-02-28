import { responseType } from "../schemas/response";
import { Project, Resolvers } from "../../types/generated/graphql";
import ProjectModel from "../../models/project";
import { ApolloError, ValidationError } from "apollo-server-errors";
import removeNullKeyValues from "../../utils/removeNullKeyValues";
import dateScalar from "../scalars/date";
import { GraphQLUpload } from "graphql-upload";
import validateImageExtension from "../../utils/validateImageExtension";
import createFile from "../../utils/createFile";
import handleFileUpload from "../../utils/handleFileUpload";

const projectsPerPage: number = 24;
const projectResolvers: Resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload as any,
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
    //Needs more testing
    createProject: async (_, args, context, ____) => {
      const project = ProjectModel.build(args);
      const projectCreatedStatus = await project.save();

      if (!projectCreatedStatus) {
        throw new ApolloError("Something went wrong when creating a project");
      }

      if (project && args && args.images) {
        let imagePaths = [];

        for (let i in args.images) {
          let img = await args.images[i];

          let path = handleFileUpload(img, project.name, "/static/projects");
          imagePaths.push(path);
        }

        ProjectModel.update(
          { images: imagePaths },
          { where: { id: project.id } }
        );
      }

      return {
        message: "Successfully created a project",
      } as responseType;
    },
    updateProject: async (_, args, context, ____) => {
      let projectFields = removeNullKeyValues(args);

      let project = await ProjectModel.findOne({ where: { id: args.id } });
      let imagePaths = [];

      if (!project) {
        return { message: "No project found" };
      }

      if (args.images) {
        for (let i in args.images) {
          let img = await args.images[i];

          let path = handleFileUpload(img, project.name, "/static/projects");
          imagePaths.push(path);
        }

        projectFields = { ...projectFields, images: imagePaths };
      }

      ProjectModel.update(projectFields, { where: { id: args.id } });
      return {
        message: "Successfully updated a project",
      } as responseType;
    },
  },
};

export default projectResolvers;
