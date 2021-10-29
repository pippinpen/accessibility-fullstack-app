const path = require("path");

const {
  NODE_ENV='development'
} = process.env;

module.exports = function (app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";
  app.use(`${API_ENDPOINT}/${API_VERSION}/users`, require("./users.routes"));
  app.use(`${API_ENDPOINT}/${API_VERSION}/formTypes`, require("./formType.routes"));

  app.get("*", (req, res) => {
    if(req.xhr) {
      return res.sendStatus(404);
    }
    if (NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, "../../client/", "build/index.html"));
    }
  });

  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};
