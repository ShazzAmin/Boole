import axios from "axios";

import LocalStorage from "./local-storage";

// Adapted from https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function hash(data) {
  let digest = 0;
  for (let i = 0; i < data.length; i++) {
    digest = (digest << 5) - digest + data.charCodeAt(i);
    // Convert to 32-bit integer
    digest = digest & digest;
  }
  return digest;
}

export class File {
  constructor(name) {
    this.name = name;
    this.key = `file:${name}`;
  }

  async get() {
    return await LocalStorage.get(this.key);
  }
  get = this.get.bind(this);

  set = (value) => {
    LocalStorage.set(this.key, value);
  };

  reset = async () => {
    // Back up the file just in case the user needs to recover it
    const deletedFileContent = await this.get();
    LocalStorage.set(`deleted_file:${this.name}-${hash(deletedFileContent)}`, deletedFileContent);

    LocalStorage.reset(this.key);
  };
}

export class DefaultFile extends File {
  constructor(name, defaultValue) {
    super(name);

    this.defaultValue = defaultValue;

    this.get = this.get.bind(this);
  }

  async get() {
    try {
      return await super.get();
    } catch {
      return this.defaultValue;
    }
  }
  get = this.get.bind(this);
}

export class RemoteFile extends File {
  constructor(name, path) {
    super(name);

    this.path = path;

    this.get = this.get.bind(this);
  }

  async get() {
    try {
      return await super.get();
    } catch {
      return (await axios.get(`/~se212${this.path}`)).data;
    }
  }
  get = this.get.bind(this);
}

