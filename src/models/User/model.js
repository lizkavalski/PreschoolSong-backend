const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;
// move this to the user.model
const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      // a set of unique values
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      // this will happen anytime someone GETS this user model
      get() {
        return jwt.sign({ username: this.username }, SECRET, {
          expiresIn: 1000 * 60 * 60 * 24,
        });
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });
  // special method - like a prototype method added to a class
  model.authenticateBearer = async (token) => {
    try {
      // deconstruct the payload from the token
      // payload secret
      // should give us {username: theoreticalUser}
      const payload = jwt.verify(token, SECRET);
      // if it is a real user - we will consider that to be authenticated or valid and send the user back aka is the user in the database
      const user = await model.findOne({
        where: { username: payload.username },
      });
      return user;
      // if not they get null back OR an error
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return model;
};

module.exports = userModel;