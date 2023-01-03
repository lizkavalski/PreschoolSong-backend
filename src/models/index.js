"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./users/model.js");
const CategoryModel = require("./Category/model");
const SongModel = require("./Song/model");

const Collection = require("./dataCollection.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

const sequelize = new Sequelize(DATABASE_URL);

const users = userModel(sequelize, DataTypes);
const theme = CategoryModel(sequelize, DataTypes);
const song = SongModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: new Collection(users),
  theme: new Collection(theme),
  song: new Collection(song),
};
