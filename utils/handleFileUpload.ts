import { FileUpload } from "graphql-upload";
import validateImageExtension from "./validateImageExtension";
import createFile from "./createFile";
import { replaceWhiteSpace } from "../utils/stringOps";

const handleFileUpload = (
  file: FileUpload,
  folderName: string,
  location: string
) => {
  const { filename, mimetype, encoding, createReadStream } = file;

  let now = Date.now().toString();
  let fileExtension = mimetype.split("/").slice(-1)[0].toLowerCase();

  let validFolderName = replaceWhiteSpace(folderName, "_");

  validateImageExtension(fileExtension);

  let fullFileName = `${filename}-${now}.${fileExtension}`;
  let fullPath = `${location}/${validFolderName}`;
  createFile(createReadStream(), fullFileName, fullPath);

  return `${fullPath}/${fullFileName}`;
};

export default handleFileUpload;
