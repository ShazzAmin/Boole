import axios from "axios";

import LocalStorage from "./local-storage";

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
      return (await axios.get(`https://www.student.cs.uwaterloo.ca/~se212${this.path}`)).data;
    }
  }
  get = this.get.bind(this);
}

