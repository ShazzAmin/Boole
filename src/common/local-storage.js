export default class LocalStorage {
  static get = async (key) => {
    return new Promise((resolve, reject) => {
      const value = window.localStorage.getItem(key);
      if (value !== null) resolve(value);
      else reject();
    });
  };

  static set = (key, value) => {
    window.localStorage.setItem(key, value);
  };

  static reset = (key) => {
    window.localStorage.removeItem(key);
  };
}

