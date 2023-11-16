const { user } = require('../models/index');

const bearer = async (req, res, next) => {
  if (!req.headers.authorization)
    return next('Not authorized, no token present');
  try {
    const [authType, token] = req.headers.authorization.split(' ');
    if (authType === 'Bearer') {
      // Access the Sequelize model from the Collection instance
      const userModel = user.model;
      
      let validUser = await userModel.authenticateBearer(token);

      console.log("🐝", validUser);

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

