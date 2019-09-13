/* For local development purposes only. */

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(["^/files/", "^/verify$"], proxy({
    target: "https://student.cs.uwaterloo.ca/~se212/",
    changeOrigin: true,
    pathRewrite: {
      "^/files/": "/",
      "^/verify$": "/george/ask-george/cgi-bin/george.cgi/check"
    }
  }));
};
