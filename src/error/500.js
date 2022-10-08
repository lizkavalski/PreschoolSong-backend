'use strict'

module.exports = function (err, req, res, next) {

  // Sometimes, errors come in as an object, others as a string
  const error = err.message ? err.message : err;

  const erroeObject={
    status:500,
    message:'“What do you want me to do, dress in drag and do the hula?”- Timon, (The Lion King)'
  };
  res.status(500).json(erroeObject, e)
}

