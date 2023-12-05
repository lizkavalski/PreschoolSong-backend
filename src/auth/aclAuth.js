const {user} = require("../models/index");

const acl = (capabilty) => (req, res, next) => {
  try {
    if (req.user.capabilities.includes(capabilty)) next();
    else next('Access Denied');
  } catch (e) {
    next('Invalid Login, (acl middleware)');
  }
};
module.exports = acl
