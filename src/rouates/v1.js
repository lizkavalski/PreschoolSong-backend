"use strict";

const express = require("express");
const router = express.Router();
const modelsMiddleware = require("../middleware/model.js");
const {youTubeAPI} = require('../middleware/video/video.js')
const {datapage} = require('../middleware/welcome.js')
const {handleGetAll, handleGetOne}= require('../middleware/CURD/read.js')
const {modelCreate}= require('../middleware/CURD/create.js')
const {handleUpdate} = require('../middleware/CURD/update.js')
const {handleDelete} = require ('../middleware/CURD/delete.js')

router.param("model", modelsMiddleware);

router.get("/", datapage)
router.get("/test", youtubeData)
router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", modelCreate)
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

async function youtubeData(req,res){
  let message= await youTubeAPI(req.body.url)
  res.status(200).json(message)
  }

module.exports = router;
