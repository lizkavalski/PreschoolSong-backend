"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const CategoryModel = require("./Category/model");
const SongModel = require("./Song/model");

const Collection = require("./dataCollection.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

const sequelize = new Sequelize(DATABASE_URL);

const theme = CategoryModel(sequelize, DataTypes);
const song = SongModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  theme: new Collection(theme),
  song: new Collection(song),
};
