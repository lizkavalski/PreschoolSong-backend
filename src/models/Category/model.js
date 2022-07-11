const CategoryModel = (sequelize, DataTypes) => sequelize.define('theme', {
  category: { type: DataTypes.STRING, required: true },
  title: { type: DataTypes.STRING, required: true },
  image: { type: DataTypes.STRING, required: true },
  description:{type: DataTypes.STRING,require:true},
});

module.exports = CategoryModel;