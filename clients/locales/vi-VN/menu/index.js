const menu = require('./menu');
const menuValidate = require('./menu.validate');

module.exports = {
  ...menu,
  ...menuValidate,
}