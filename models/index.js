const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

// one to many
User.hasMany(Post, {
  foreignKey: "user_id",
});

//one to many
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

//one to one
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

// one to many
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

//one to one
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

// one to one
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

module.exports = { User, Post, Comment };
