const { Sequelize, DataTypes } = require("sequelize");
const CategoryModel = require("./Category/model");
const SongModel = require("./Song/model");
const userModel = require("./User/model");
const Collection = require("./dataCollection.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

const sequelize = new Sequelize(DATABASE_URL);

const theme = CategoryModel(sequelize, DataTypes);
const song = SongModel(sequelize, DataTypes);
const user = userModel(sequelize,DataTypes);

module.exports = {
  db: sequelize,
  theme: new Collection(theme),
  song: new Collection(song),
  user: new Collection(user)
};
