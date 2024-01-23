"use strict";

const express = require("express");
const cors= require('cors');
const session = require('express-session');
// const passport = require('./auth/passportConfig'); // Import the Passport.js configuration
// const ensureAuthenticated = require('./auth/authMiddleware'); // Import the authentication middleware
const notFound = require("./error/404.js");
const oops = require("./error/500.js");
const v1rouates = require("./rouates/v1.js");
// const v2rouates = require("./rouates/v2.js");
const v3rouates = require("./rouates/v3.js");
// const authRouates = require("./rouates/auth.js");

const app = express();
app.use(cors())
app.use(express.json());


// ... Other configurations and middleware ...
let secretIngredient= process.env.SECRET
// Configure session
// app.use(session({
//   secret: secretIngredient,
//   resave: false,
//   saveUninitialized: true,
// }));

// Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());


// app.use(logger);

// app.use(authRouates);
app.use("/v1", v1rouates);
// app.use("/v2", v2rouates);
app.use("/v3", v3rouates)
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
