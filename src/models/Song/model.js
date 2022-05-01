const SongModel = (sequelize, DataTypes) => sequelize.define('Todo', {
  title: { type: DataTypes.STRING, required: true },
  by: { type: DataTypes.STRING, required: true },
  category: { type: DataTypes.STRING, required: true },
  video:{type:DataTypes.STRING},
});

module.exports = SongModel;