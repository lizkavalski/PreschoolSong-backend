const { userModel } = require('../models');

const bearer = async (req, res, next) => {
  if (!req.headers.authorization)
    return next('Not authorized, no token present');
  try {
    const [authType, token] = req.headers.authorization.split(' ');
    if (authType === 'Bearer') {
      let validUser = await userModel.authenticateBearer(token);
      if (validUser) {
        req.user = validUser;
        next();
      } else {
        next('No user was found 🙅‍♀️');
      }
    } else {
      next('No token present 🙅‍♀️');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = bearer;