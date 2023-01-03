const SongModel = (sequelize, DataTypes) =>
  sequelize.define("song", {
    title: { type: DataTypes.STRING, required: true },
    by: { type: DataTypes.STRING, required: true },
    category: { type: DataTypes.STRING, required: true },
    url: { type: DataTypes.STRING },
  });

module.exports = SongModel;
