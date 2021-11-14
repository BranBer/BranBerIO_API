import { DocumentNode } from "graphql";
import projectTypes from "./schemas/project";
import responseType from "./schemas/response";

const typeDefs: DocumentNode[] = [responseType, projectTypes];

export default typeDefs;
