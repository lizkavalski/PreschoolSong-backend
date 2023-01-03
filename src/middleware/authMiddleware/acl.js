"use strict";

module.exports = (capabilitie) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capabilitie)) {
        next();
      } else {
        next("Access Denied");
      }
    } catch (e) {
      next("Invalid Login");
    }
  };
};
