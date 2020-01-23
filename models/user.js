'use strict';
// var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING
  }, {});

  // user.beforeSave((user, options) => {
  //   if (user.changed('password')) {
  //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  //   }
  // });
  // user.prototype.comparePassword = function (passw, cb) {
  //   bcrypt.compare(passw, this.password, function (err, isMatch) {
  //       if (err) {
  //           return cb(err);
  //       }
  //       cb(null, isMatch);
  //   });
  // };

  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};