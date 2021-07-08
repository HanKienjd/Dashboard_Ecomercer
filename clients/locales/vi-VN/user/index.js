const user = require('./user');
const userValidate = require('./user.validate');
const placeUsers = require('./placeUsers');

module.exports = {
  ...user,
  ...userValidate,
  ...placeUsers
}