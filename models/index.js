const Blog = require('./Blog');
const User = require('./User');

User.hasMany(Blog, {
  foreignKey: 'userId',
  // if we delete user, delete all their todos as well
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'userId',
});


module.exports = {
  Blog,
  User,
};