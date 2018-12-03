/* global chrome */

const CHROME_EXT = process.env.REACT_APP_CHROME_EXT === "true";

export default class LocalStorage {
  static get = async (key) => {
    return new Promise((resolve, reject) => {
      if (CHROME_EXT) {
        chrome.storage.sync.get(key, (result) => {
          if (key in result) resolve(result[key]);
          else reject();
        });
      } else {
        const value = window.localStorage.getItem(key);
        if (value !== null) resolve(value);
        else reject();
      }
    });
  };

  static set = (key, value) => {
    if (CHROME_EXT) {
      chrome.storage.sync.set({ [key]: value });
    } else {
      window.localStorage.setItem(key, value);
    }
  };
}

