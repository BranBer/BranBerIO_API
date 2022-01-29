import fs, { ReadStream, createWriteStream } from "fs";
import { finished } from "stream";

let createFile = (
  readStream: ReadStream,
  fileName: string,
  dirPath: string
) => {
  let absPath = process.cwd() + "/" + dirPath;
  if (!fs.existsSync(absPath)) {
    fs.mkdirSync(absPath, { recursive: true });
  }

  let out = createWriteStream(`${absPath}/${fileName}`);
  readStream.pipe(out);
};

export default createFile;
