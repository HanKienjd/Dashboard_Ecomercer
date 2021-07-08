const login = require('./login');
const loginValidate = require('./login.validate');

module.exports = {
  ...login,
  ...loginValidate,
}