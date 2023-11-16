const bcrypt = require('bcrypt');
const { user } = require('../../models');

const signUp = async (req, res, next)=> {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await user.create(req.body);
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(403).send('Error Creating User');
  }
}

module.exports = signUp