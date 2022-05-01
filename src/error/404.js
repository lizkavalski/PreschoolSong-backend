'use strict';

function notFound(req,res, next){
  const errorObject={
    status:404,
    message:'"If you don\'t know where you want to go, then it doesn\'t matter which path you take." -- The Cheshire Cat (Alice in Wonderland)'
  }
  res.status(404).json(errorObject)
}

module.exports= notFound;