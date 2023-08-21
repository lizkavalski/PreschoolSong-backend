"use strict";

const express = require("express");
const router = express.Router();
const modelsMiddleware = require("../middleware/model.js");

const {handleGetAll, handleGetOne}= require('../middleware/CURD/read.js')
const {modelCreate}= require('../middleware/CURD/create.js')
const {handleUpdate} = require('../middleware/CURD/update.js')
const {handleDelete} = require ('../middleware/CURD/delete.js')

router.param("model", modelsMiddleware);

const passport = require("../auth/passportConfig.js");
const ensureAuthenticated = require("../auth/authMiddleware.js"); // Import the authentication middleware
const { promisify } = require('util');
const authenticateGoogle = promisify(passport.authenticate.bind(passport, 'google', { scope: ['openid','profile', 'email'] }));
// const authenticateGoogleCallback = promisify(passport.authenticate.bind(passport, 'google', { failureRedirect: '/' }));

// New route for handling the Google OAuth callback
router.get("/", datapage);

router.get('/auth/login', authenticateGoogle)
router.get('/auth/callback', authenticateGoogleCallback)
router.get ('/protected', ensureAuthenticated,proofOfLife)

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", modelCreate)
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

async function proofOfLife (req,res){
  res.send(`Hello, ${req.user.displayName}! You are authenticated!`);
}

async function authenticateGoogleCallback(req, res) {
  try {
    await authenticateGoogleCallback(req, res);
    // Successful authentication, redirect to the protected route or any other route you desire
    res.redirect('/protected');
  } catch (error) {
    console.error('Google authentication callback error:', error);
    res.redirect('/error'); // Handle error redirection to an error page
  }
}

async function datapage(req, res) {
  let message = {
    message: '"There no place like home"- Dorothy(Wizard of Oz)',
  };
  res.status(200).json(message);
}


module.exports = router;