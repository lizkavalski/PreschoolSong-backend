"use strict";

const express = require("express");
const notFound = require("./error/404.js");
const oops = require("./error/500.js");
const logger = require("./middleware/logger.js");

const v1rouates = require("./rouates/v1.js");
// const v2rouates = require("./rouates/v2.js");
const authRouates = require("./rouates/auth.js");

const app = express();

app.use(express.json());

// app.use(logger);

app.use(authRouates);
app.use("/v1", v1rouates);
// app.use("/v2", v2rouates);
app.use("*", notFound);
app.use(oops);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error("Something is missing :/");
    }
    app.listen(port, () =>
      console.log(
        `"All at once everything looks different, now that I see you"-Tangled on port ${port}'`
      )
    );
  },
};
