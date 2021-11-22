import { ValidationError } from "apollo-server-errors";

interface fileExtensionSignature {
  [key: string]: boolean;
}

let validImageExtensions: fileExtensionSignature = {
  png: true,
  jpg: true,
  jpeg: true,
  svg: true,
  ico: true,
};

export { validImageExtensions };
