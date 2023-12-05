"use strict";

const express = require("express");
const router = express.Router();
const basic = require('../auth/basicAuth');
const bearer = require('../auth/bearerAuth');
const acl = require('../auth/aclAuth');
const { user } = require('../models/index');
const modelsMiddleware = require("../middleware/model.js");
const signUp = require("../middleware/auth/signup")
const {handleGetAll, handleGetOne} = require('../middleware/CURD/read.js')
const {modelCreate}= require('../middleware/CURD/create.js')
const {handleUpdate} = require('../middleware/CURD/update.js')
const {handleDelete} = require ('../middleware/CURD/delete.js')

router.param("model", modelsMiddleware);


router.use(express.json());

router.use(express.urlencoded({ extended: true }));

router.get('/', datapage)
router.post('/signup', signUp);

router.post('/login', basic, (req, res) => {
  res.status(200).json(req.user);
});
router.get('/users', async (req, res) => {
  let allUsers = await user.get();
  res.status(200).send(allUsers);
});

router.get('/:model',  bearer, acl('read'),handleGetAll,);
router.get('/:model/:id', bearer, acl('read'), handleGetOne)
router.post('/:model', bearer, acl('create'),modelCreate);
router.put('/:model/:id', bearer, acl('update'), handleUpdate);
router.delete('/:model/:id', bearer, acl('delete'), handleDelete)

async function datapage(req, res) {
  let message = {
    message: '"There no place like home"- Dorothy(Wizard of Oz)',
  };
  res.status(200).json(message);
}


module.exports = router;