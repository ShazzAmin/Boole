/* global chrome */

const CHROME_EXT = false; // TODO: do this switch in .env

let browser = window.localStorage;

export default class LocalStorage {
  static get = async (key) => {
    return new Promise((resolve, reject) => {
      if (CHROME_EXT) {
        chrome.get(key, (result) => {
          if (key in result) resolve(result[key]);
          else reject();
        });
      } else {
        const value = browser.getItem(key);
        if (value !== null) resolve(value);
        else reject();
      }
    });
  };

  static set = (key, value) => {
    if (CHROME_EXT) {
      chrome.set({ [key]: value });
    } else {
      browser.setItem(key, value);
    }
  };
}

