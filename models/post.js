const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: falsem,
    },
    content: {
      type: DataTypes.TEXT,
      //TEXT is unlimited in length however STRING default to 255 characters in length
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    //timestamps: false, - need to comment out as we want the timestamps
    freezeTableName: true,
    underscored: true,
    modelNameL: "post",
  }
);

module.exports = Post;
