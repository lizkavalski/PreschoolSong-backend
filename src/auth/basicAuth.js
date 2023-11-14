const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { user } = require('../models');

const basic = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');
  
  try {
    const foundUser = await user.model.findOne({
      where: { username: username },
      attributes: ['id', 'username', 'password', 'role', 'token'],
    });
    
    if (!foundUser) {
      throw new Error('User not found 🙅‍♀️');
    }

    const valid = await bcrypt.compare(password, foundUser.password);

    if (valid) {
      req.username = foundUser.username;
      req.user = foundUser;
      next();
    } else {
      throw new Error('Invalid User 🙅‍♀️');
    }
  } catch (error) {
    console.error(error);
    res.status(403).send('Invalid Login 🙅‍♀️');
  }
};

module.exports = basic;


