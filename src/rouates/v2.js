"use strict";

const express = require("express");
const router = express.Router();
const modelsMiddleware = require("../middleware/model.js");
const { youTubeAPI } = require("../middleware/video/video.js");
const {handleGetAll, handleGetOne}= require('../middleware/CURD/read.js')
const {modelCreate}= require('../middleware/CURD/create.js')
const {handleUpdate} = require('../middleware/CURD/update.js')
const {handleDelete} = require ('../middleware/CURD/delete.js')

router.param("model", modelsMiddleware);

const passport = require("../auth/passportConfig.js");
const ensureAuthenticated = require("../auth/authMiddleware.js"); // Import the authentication middleware
const { promisify } = require('util');
const authenticateGoogle = promisify(passport.authenticate.bind(passport, 'google', { scope: ['openid','profile', 'email'] }));
const authenticateGoogleCallback = promisify(passport.authenticate.bind(passport, 'google', { failureRedirect: '/' }));

// Import your Passport.js configuration (assuming it's in passportConfig.js)
require("../auth/passportConfig.js");

// New route for handling the Google OAuth callback
router.get("/", datapage);
router.get("/test", youtubeData)

router.get('/auth/login', login)
router.get('/auth/callback', googleCallback)
router.get ('/protected', ensureAuthenticated,proofOfLife)

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", modelCreate)
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

async function login(req,res){
  try {
    console.log('i am on line 40')
    await authenticateGoogle(req, res);
  } catch (error) {
    console.error('Google authentication error:', error);
    res.redirect('/'); // Handle error redirection as desired
  }
};

async function googleCallback(req,res){
  try {
    await authenticateGoogleCallback(req, res);
    // Successful authentication, redirect to the protected route or any other route you desire
    res.redirect('/protected');
  } catch (error) {
    console.error('Google authentication callback error:', error);
    res.redirect('/'); // Handle error redirection as desired
  }
};

async function proofOfLife (req,res){
  res.send(`Hello, ${req.user.displayName}! You are authenticated!`);
}


async function datapage(req, res) {
  let message = {
    message: '"There no place like home"- Dorothy(Wizard of Oz)',
  };
  res.status(200).json(message);
}

async function youtubeData(req,res){
let message= await youTubeAPI(req.body.url)
res.status(200).json(message)
}

module.exports = router;