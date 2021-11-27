import { DocumentNode } from "graphql";
import projectTypes from "./schemas/project";
import responseType from "./schemas/response";
import userTypes from "./schemas/user";

const typeDefs: DocumentNode[] = [responseType, projectTypes, userTypes];

export default typeDefs;
