import axios from "axios";

import { DefaultFile, RemoteFile } from "./files";

const miscellaneousDirectory = {
  name: "Miscellaneous",
  expanded: true,
  files: [
    new DefaultFile("scratchpad.grg", "#u name\n#a 01\n\n#q 01\n\n#check PROP\n\na => b")
  ]
};

export default class Directories {
  static get = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const directories = (await axios({
          method: "get",
          url: "/files/files.json",
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
        alert("Failed to get list of files!");
      }
    });
  };
}

