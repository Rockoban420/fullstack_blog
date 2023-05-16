const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'userId',
  // if we delete user, delete all their todos as well
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

Blog.hasMany(Comment, {
  foreignKey: 'blogId',
  //if we delete the blogpost, we delete all comments
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blogId', 
});

// Comment.belongsTo(User, {
//   foreignKey: 'usernameId',
// });

// User.hasMany(Comment, {
//   foreignKey: 'usernameId',
//   onDelete: 'CASCADE',
// });


module.exports = {
  Blog,
  User,
  Comment
};