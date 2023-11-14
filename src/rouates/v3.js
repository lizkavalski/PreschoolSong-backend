"use strict";

const express = require("express");
const router = express.Router();
const basic = require('../auth/basicAuth');
const bearer = require('../auth/bearerAuth');
const acl = require('../auth/aclAuth');
const { user } = require('../models/index');
const modelsMiddleware = require("../middleware/model.js");
const signUp = require("../middleware/auth/signup")
// const {handleGetAll, handleGetOne} = require('../middleware/CURD/read.js')
// const {modelCreate}= require('../middleware/CURD/create.js')
// const {handleUpdate} = require('../middleware/CURD/update.js')
// const {handleDelete} = require ('../middleware/CURD/delete.js')

router.param("model", modelsMiddleware);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/signup', signUp);

app.post('/login', basic, (req, res) => {
  res.status(200).json(req.user);
});

app.get('/users', async (req, res) => {
  let allUsers = await user.findAll();
  res.status(200).send(allUsers);
});

// add routes that will be permission based off role
app.get('/read', bearer, acl('read'), (req, res) => {
  res.status(200).send('you have read access');
});
app.post('/create', bearer, acl('create'), (req, res) => {
  res.status(200).send('you have create access');
});
app.put('/update', bearer, acl('update'), (req, res) => {
  res.status(200).send('you have update access');
});
app.delete('/delete', bearer, acl('delete'), (req, res) => {
  res.status(200).send('you have delete access');
});

async function datapage(req, res) {
  let message = {
    message: '"There no place like home"- Dorothy(Wizard of Oz)',
  };
  res.status(200).json(message);
}
module.exports = app;
// router.get("/", datapage)
// router.get("/:model", handleGetAll);
// router.get("/:model/:id", handleGetOne);
// router.post("/:model", modelCreate)
// router.put("/:model/:id", handleUpdate);
// router.delete("/:model/:id", handleDelete);


// module.exports = router;