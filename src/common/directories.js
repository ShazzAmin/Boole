import axios from "axios";

import { DefaultFile, RemoteFile } from "./files";
import miscFiles from "./misc-files.js";

const miscellaneousDirectory = {
  name: "Miscellaneous",
  expanded: true,
  files: miscFiles.map(({ name, contents }) => new DefaultFile(name, contents)),
};

export default class Directories {
  static get = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const directories = (await axios({
          method: "get",
          url: "/~se212/files.json",
          responseType: "json"
        })).data;

        const remoteDirectories = directories.map((directory) => {
          return {
            name: directory.name,
            expanded: false,
            files: directory.files.map((file) => new RemoteFile(file.name, file.path))
          };
        });

        resolve([
          miscellaneousDirectory,
          ...remoteDirectories
        ]);
      } catch (err) {
        console.error("Failed to get list of remote files!");

        resolve([
          miscellaneousDirectory,
        ]);
      }
    });
  };
}

