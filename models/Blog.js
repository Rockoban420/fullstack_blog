const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Blog extends Model {
}


Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'blog',
    // timestamps: false,
  }
);

module.exports = Blog;