import { ValidationError } from "apollo-server-errors";
import { validImageExtensions } from "./constants";

const validateImageExtension = (extension: string) => {
  if (!validImageExtensions[extension]) {
    throw new ValidationError("Invalid image extension");
  }
};

export default validateImageExtension;
