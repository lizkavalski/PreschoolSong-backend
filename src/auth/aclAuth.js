'use strict';

module.exports = (capabilty) => (req, res, next) => {
  try {
    if (req.user.capabilities.includes(capabilty)) next();
    else next('Access Denied');
  } catch (e) {
    next('Invalid Login, (acl middleware)');
  }
};
